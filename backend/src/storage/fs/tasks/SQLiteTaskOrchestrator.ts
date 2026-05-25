/**
 * SQLite 閫氱敤浠诲姟缂栨帓鍣ㄥ疄鐜?(Docker/Node.js 鐜)
 *
 *
 */

// EdgeOne 构建时跳过 better-sqlite3（仅在 Docker/Node.js 环境运行）
let Database = null;
try {
  // 使用 Function 构造器绕过 esbuild 静态分析
  Database = new Function("return require('better-sqlite3')")();
} catch {
  // EdgeOne 环境，此路径不会被执行
  Database = null;
}
import { DbTables } from '../../../constants/index.js';
import { taskRegistry } from './TaskRegistry.js';
import type { TaskHandler, InternalJob, ExecutionContext } from './TaskHandler.js';
import type {
  TaskOrchestratorAdapter,
  CreateJobParams,
  JobDescriptor,
  JobStatus,
} from './TaskOrchestratorAdapter.js';
import { TaskStatus } from './types.js';
import type { JobFilter, JobListResult, TaskStats } from './types.js';

export class SQLiteTaskOrchestrator implements TaskOrchestratorAdapter {
  private db: Database.Database;
  private workers: Promise<void>[] = [];
  private running = false;
  private fileSystem: any;

  constructor(
    fileSystem: any,  // FileSystem 瀹炰緥 (浠庡伐鍘備紶鍏?
    private dbPath: string = './data/database.db',  // 鐜版湁 D1 鍏煎 SQLite 鏁版嵁搴撹矾寰?    private concurrency: number = 10  // Worker Pool 骞跺彂鏁?  ) {
    this.fileSystem = fileSystem;
    // 鍒濆鍖?SQLite 杩炴帴 (tasks 琛ㄥ凡鐢?database.js migration case 25 鍒涘缓)
    this.db = new Database(dbPath);

    // PRAGMA 浼樺寲
    this.db.pragma('journal_mode = WAL');      // 骞跺彂璇绘€ц兘
    this.db.pragma('synchronous = 1');         // 浜嬪姟閫熷害 (NORMAL 妯″紡)
    this.db.pragma('busy_timeout = 5000');     // 5绉掗噸璇曡秴鏃?閬垮厤 SQLITE_BUSY 閿欒

    // 鍚姩鏃舵仮澶?pending/running 浣滀笟 (宕╂簝鎭㈠)
    this.recoverJobs();

    // 鍚姩鍐呭瓨 Worker Pool
    this.startWorkers();

    console.log(
      `[SQLiteTaskOrchestrator] 宸插惎鍔?(骞跺彂鏁? ${concurrency}, 鏁版嵁搴? ${dbPath})`
    );
  }

  /**
   * 鏇存柊 FileSystem 瀹炰緥寮曠敤锛堝崟渚嬫ā寮忎笅姣忔璇锋眰鍙兘浼犲叆涓嶅悓瀹炰緥锛?   */
  updateFileSystem(fileSystem: any): void {
    this.fileSystem = fileSystem;
  }

  /**
   * 鍒涘缓浠绘剰绫诲瀷鐨勪綔涓?   */
  async createJob(params: CreateJobParams): Promise<JobDescriptor> {
    const {
      taskType,
      payload,
      userId,
      userType,
      triggerType: triggerTypeRaw,
      triggerRef: triggerRefRaw,
    } = params;
    const triggerType = triggerTypeRaw ?? 'manual';
    const triggerRef = triggerRefRaw ?? null;

    // 楠岃瘉浠诲姟绫诲瀷骞惰幏鍙栧鐞嗗櫒
    const handler = taskRegistry.getHandler(taskType);
    await handler.validate(payload);

    // 鐢熸垚浣滀笟 ID (甯︿换鍔＄被鍨嬪墠缂€)
    const jobId = this.generateJobId(taskType);
    const now = Date.now();

    // 鍒涘缓鍒濆缁熻妯℃澘
    const stats = handler.createStatsTemplate(payload);

    // 鎻掑叆鏁版嵁搴?    this.db.prepare(`
      INSERT INTO ${DbTables.TASKS} (
        task_id, task_type, status, payload, stats,
        user_id, user_type,
        trigger_type, trigger_ref,
        created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      jobId,
      taskType,  // 鍔ㄦ€佷换鍔＄被鍨?      'pending',
      JSON.stringify(payload),
      JSON.stringify(stats),
      userId,
      userType,
      triggerType,
      triggerRef,
      now,
      now
    );

    console.log(
      `[SQLiteTaskOrchestrator] 宸插垱寤轰綔涓?${jobId} (浠诲姟绫诲瀷: ${taskType})`
    );

    return {
      jobId,
      taskType,
      status: TaskStatus.PENDING,
      stats,
      createdAt: new Date(now),
      updatedAt: new Date(now),
      triggerType,
      triggerRef,
    };
  }

  /**
   * 鑾峰彇浣滀笟鐘舵€?   */
  async getJobStatus(jobId: string): Promise<JobStatus> {
    // JOIN api_keys 琛ㄨ幏鍙栧瘑閽ュ悕绉?    const row = this.db.prepare(`
      SELECT 
        t.*,
        ak.name as key_name
      FROM ${DbTables.TASKS} t
      LEFT JOIN ${DbTables.API_KEYS} ak ON t.user_id = ak.id
      WHERE t.task_id = ?
    `).get(jobId) as any;

    if (!row) {
      throw new Error(`浣滀笟 ${jobId} 涓嶅瓨鍦╜);
    }

    const payload = JSON.parse(row.payload);

    return {
      jobId: row.task_id,
      taskType: row.task_type,
      status: row.status as TaskStatus,
      stats: JSON.parse(row.stats) as TaskStats,
      createdAt: new Date(row.created_at),
      startedAt: row.started_at ? new Date(row.started_at) : undefined,
      finishedAt: row.finished_at ? new Date(row.finished_at) : undefined,
      updatedAt: new Date(row.updated_at),  // 鏂板: 鏈€鍚庢洿鏂版椂闂?      errorMessage: row.error_message || undefined,
      payload,
      userId: row.user_id,
      keyName: row.key_name || null,  // API 瀵嗛挜鍚嶇О
      triggerType: row.trigger_type || 'manual',
      triggerRef: row.trigger_ref ?? null,
    };
  }

  /**
   * 鍙栨秷浣滀笟
   */
  async cancelJob(jobId: string): Promise<void> {
    const result = this.db.prepare(`
      UPDATE ${DbTables.TASKS}
      SET status = ?, updated_at = ?
      WHERE task_id = ? AND status IN ('pending', 'running')
    `).run(
      TaskStatus.CANCELLED,
      Date.now(),
      jobId
    );

    if (result.changes === 0) {
      throw new Error('浣滀笟涓嶅瓨鍦ㄦ垨宸插畬鎴?鏃犳硶鍙栨秷');
    }

    console.log(`[SQLiteTaskOrchestrator] 宸插彇娑堜綔涓?${jobId}`);
  }

  /**
   * 鍒楀嚭浣滀笟 (鏀寔浠诲姟绫诲瀷杩囨护)
   */
  async listJobs(filter?: JobFilter): Promise<JobListResult> {
    let whereClause = 'WHERE 1=1';
    const baseParams: (string | number)[] = [];

    if (filter?.taskType) {
      whereClause += ' AND t.task_type = ?';
      baseParams.push(filter.taskType);
    } else if (filter?.taskTypes && filter.taskTypes.length > 0) {
      const placeholders = filter.taskTypes.map(() => '?').join(', ');
      whereClause += ` AND t.task_type IN (${placeholders})`;
      baseParams.push(...filter.taskTypes);
    }

    if (filter?.status) {
      whereClause += ' AND t.status = ?';
      baseParams.push(filter.status);
    }

    if (filter?.userId) {
      whereClause += ' AND t.user_id = ?';
      baseParams.push(filter.userId);
    }

    const countQuery = `
      SELECT COUNT(1) as total
      FROM ${DbTables.TASKS} t
      ${whereClause}
    `;
    const countRow = this.db.prepare(countQuery).get(...baseParams) as any;
    const total = Number(countRow?.total || 0);

    let query = `
      SELECT 
        t.*,
        ak.name as key_name
      FROM ${DbTables.TASKS} t
      LEFT JOIN ${DbTables.API_KEYS} ak ON t.user_id = ak.id
      ${whereClause}
      ORDER BY t.created_at DESC
    `;
    const params = [...baseParams];

    if (filter?.limit) {
      query += ' LIMIT ?';
      params.push(filter.limit);

      if (filter?.offset) {
        query += ' OFFSET ?';
        params.push(filter.offset);
      }
    }

    const results = this.db.prepare(query).all(...params) as any[];
    const jobs = results.map((row) => ({
      jobId: row.task_id,
      taskType: row.task_type,
      status: row.status as TaskStatus,
      stats: JSON.parse(row.stats) as TaskStats,
      createdAt: new Date(row.created_at),
      startedAt: row.started_at ? new Date(row.started_at) : undefined,
      finishedAt: row.finished_at ? new Date(row.finished_at) : undefined,
      updatedAt: new Date(row.updated_at),  // 鏂板: 鏈€鍚庢洿鏂版椂闂?      payload: JSON.parse(row.payload),
      userId: row.user_id,
      keyName: row.key_name || null,  // API 瀵嗛挜鍚嶇О
      triggerType: row.trigger_type || 'manual',
      triggerRef: row.trigger_ref ?? null,
    }));

    return { jobs, total };
  }

  /**
   * 鍒犻櫎浣滀笟
   */
  async deleteJob(jobId: string): Promise<void> {
    const row = this.db.prepare(`
      SELECT status FROM ${DbTables.TASKS} WHERE task_id = ?
    `).get(jobId) as any;

    if (!row) {
      throw new Error(`浣滀笟 ${jobId} 涓嶅瓨鍦╜);
    }

    if (row.status === TaskStatus.PENDING || row.status === TaskStatus.RUNNING) {
      throw new Error(`涓嶈兘鍒犻櫎杩愯涓殑浣滀笟 ${jobId},璇峰厛鍙栨秷`);
    }

    this.db.prepare(`
      DELETE FROM ${DbTables.TASKS} WHERE task_id = ?
    `).run(jobId);

    console.log(`[SQLiteTaskOrchestrator] 宸插垹闄や綔涓?${jobId}`);
  }

  // ==================== 鍐呴儴鏂规硶 ====================

  /**
   * 鍚姩鍐呭瓨 Worker Pool
   */
  private startWorkers(): void {
    this.running = true;

    for (let i = 0; i < this.concurrency; i++) {
      this.workers.push(this.workerLoop());
    }

    console.log(`[SQLiteTaskOrchestrator] 宸插惎鍔?${this.concurrency} 涓?Worker`);
  }

  /**
   * Worker 寰幆 (鎸佺画杩愯鐩村埌 orchestrator 鍋滄)
   * 浣跨敤鎸囨暟閫€閬跨瓥鐣ヤ紭鍖栫┖闂茶疆璇細鍒濆 500ms锛屾瘡娆＄┖闂茬炕鍊嶏紝鏈€澶?8 绉?   */
  private async workerLoop(): Promise<void> {
    const MIN_POLL_INTERVAL = 500;   // 鍒濆杞闂撮殧 500ms
    const MAX_POLL_INTERVAL = 8000; // 鏈€澶ц疆璇㈤棿闅?8 绉?    let currentInterval = MIN_POLL_INTERVAL;

    while (this.running) {
      // 鍘熷瓙鑾峰彇涓嬩竴涓緟鎵ц浣滀笟
      const job = this.getNextJob();

      if (job) {
        // 鏈変綔涓氭椂閲嶇疆杞闂撮殧
        currentInterval = MIN_POLL_INTERVAL;
        await this.processJob(job);
      } else {
        // 鏃犲緟澶勭悊浣滀笟锛屼娇鐢ㄦ寚鏁伴€€閬夸紤鐪?        await new Promise(resolve => setTimeout(resolve, currentInterval));
        // 鎸囨暟澧為暱锛屼絾涓嶈秴杩囨渶澶у€?        currentInterval = Math.min(currentInterval * 2, MAX_POLL_INTERVAL);
      }
    }
  }

  /**
   * 鍘熷瓙鑾峰彇涓嬩竴涓緟鎵ц浣滀笟骞舵爣璁颁负 running
   *
   * 浣跨敤 BEGIN IMMEDIATE TRANSACTION (鑰岄潪 BEGIN TRANSACTION) 闃叉姝婚攣
   */
  private getNextJob(): InternalJob | null {
    this.db.exec('BEGIN IMMEDIATE TRANSACTION');  // 鍏抽敭: IMMEDIATE 閬垮厤姝婚攣

    try {
      const row = this.db.prepare(`
        SELECT * FROM ${DbTables.TASKS}
        WHERE status = 'pending'
        ORDER BY created_at
        LIMIT 1
      `).get() as any;

      if (row) {
        const now = Date.now();

        // 鏍囪涓?running
        this.db.prepare(`
          UPDATE ${DbTables.TASKS}
          SET status = ?, started_at = ?, updated_at = ?
          WHERE task_id = ?
        `).run(
          TaskStatus.RUNNING,
          now,
          now,
          row.task_id
        );

        this.db.exec('COMMIT');

        const payload = JSON.parse(row.payload);
        const stats: TaskStats = JSON.parse(row.stats);

        return {
          jobId: row.task_id,
          taskType: row.task_type,  // 浠庢暟鎹簱璇诲彇
          payload,
          userId: row.user_id,
          userType: row.user_type,
          stats,
          createdAt: new Date(row.created_at),
        };
      }

      this.db.exec('ROLLBACK');
      return null;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  /**
   * 澶勭悊浣滀笟 (浣跨敤 TaskHandler 鎵ц)
   */
  private async processJob(job: InternalJob): Promise<void> {
    console.log(
      `[SQLiteTaskOrchestrator] 寮€濮嬪鐞嗕綔涓?${job.jobId} (浠诲姟绫诲瀷: ${job.taskType})`
    );

    let errorMessage: string | undefined;

    try {
      // 鑾峰彇浠诲姟澶勭悊鍣?      const handler = taskRegistry.getHandler(job.taskType);

      // 鍒涘缓鎵ц涓婁笅鏂?      const context: ExecutionContext = {
        isCancelled: async (jobId: string) => {
          const row = this.db.prepare(`
            SELECT status FROM ${DbTables.TASKS} WHERE task_id = ?
          `).get(jobId) as any;
          return row?.status === TaskStatus.CANCELLED;
        },

        updateProgress: async (jobId: string, stats: Partial<TaskStats>) => {
          const currentRow = this.db.prepare(`
            SELECT stats FROM ${DbTables.TASKS} WHERE task_id = ?
          `).get(jobId) as any;

          const currentStats = JSON.parse(currentRow.stats);
          const updatedStats = { ...currentStats, ...stats };

          this.db.prepare(`
            UPDATE ${DbTables.TASKS}
            SET stats = ?, updated_at = ?
            WHERE task_id = ?
          `).run(
            JSON.stringify(updatedStats),
            Date.now(),
            jobId
          );
        },

        getFileSystem: () => this.fileSystem,
        getEnv: () => ({ db: this.db }),
      };

      // 鎵ц浠诲姟 (濮旀墭缁?TaskHandler)
      await handler.execute(job, context);
    } catch (error: any) {
      errorMessage = error.message || String(error);
      console.error(
        `[SQLiteTaskOrchestrator] 浣滀笟 ${job.jobId} 鎵ц澶辫触:`,
        error
      );
    }

    // 妫€鏌ユ渶缁堢姸鎬?(鍙兘宸茶鍙栨秷)
    const finalRow = this.db.prepare(`
      SELECT status, stats FROM ${DbTables.TASKS} WHERE task_id = ?
    `).get(job.jobId) as any;

    if (finalRow.status === TaskStatus.CANCELLED) {
      console.log(
        `[SQLiteTaskOrchestrator] 浣滀笟 ${job.jobId} 宸茶鐢ㄦ埛鍙栨秷,淇濇寔 cancelled 鐘舵€乣
      );
      return;
    }

    // 鏍规嵁缁熻缁撴灉纭畾鏈€缁堢姸鎬?    const finalStats = JSON.parse(finalRow.stats) as TaskStats;
    const finalStatus: TaskStatus =
      errorMessage ? TaskStatus.FAILED :
      finalStats.failedCount === 0 ? TaskStatus.COMPLETED :
      finalStats.successCount === 0 ? TaskStatus.FAILED :
      TaskStatus.PARTIAL;

    // 鏇存柊鏈€缁堢姸鎬?    this.db.prepare(`
      UPDATE ${DbTables.TASKS}
      SET status = ?, finished_at = ?, updated_at = ?, error_message = ?
      WHERE task_id = ?
    `).run(
      finalStatus,
      Date.now(),
      Date.now(),
      errorMessage || null,
      job.jobId
    );

    console.log(
      `[SQLiteTaskOrchestrator] 浣滀笟 ${job.jobId} 鎵ц瀹屾垚 (鏈€缁堢姸鎬? ${finalStatus})`
    );
  }

  /**
   * 宕╂簝鎭㈠: 鍚姩鏃舵仮澶?pending/running 浣滀笟
   */
  private recoverJobs(): void {
    const rows = this.db.prepare(`
      SELECT task_id, task_type FROM ${DbTables.TASKS}
      WHERE status IN ('pending', 'running')
      ORDER BY created_at
    `).all() as any[];

    for (const row of rows) {
      this.db.prepare(`
        UPDATE ${DbTables.TASKS}
        SET status = ?, updated_at = ?
        WHERE task_id = ?
      `).run(
        'pending',
        Date.now(),
        row.task_id
      );
    }

    if (rows.length > 0) {
      console.log(
        `[SQLiteTaskOrchestrator] 宸叉仮澶?${rows.length} 涓緟澶勭悊浣滀笟 ` +
          `(浠诲姟绫诲瀷: ${[...new Set(rows.map(r => r.task_type))].join(', ')})`
      );
    }
  }

  /**
   * 鐢熸垚鍞竴浣滀笟 ID (鏍煎紡: taskType-YYMMDDHHMM-random6)
   * 绀轰緥: copy-2512011430-a3f5g7
   */
  private generateJobId(taskType: string): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // 25
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 12
    const day = now.getDate().toString().padStart(2, '0'); // 01
    const hour = now.getHours().toString().padStart(2, '0'); // 14
    const minute = now.getMinutes().toString().padStart(2, '0'); // 30
    const timeStr = `${year}${month}${day}${hour}${minute}`; // 2512011430
    const random = Math.random().toString(36).substring(2, 8); // 6浣嶉殢鏈虹爜
    return `${taskType}-${timeStr}-${random}`;
  }

  /**
   * 浼橀泤鍏抽棴 orchestrator (鍋滄 Worker,鍏抽棴鏁版嵁搴?
   */
  async shutdown(): Promise<void> {
    console.log('[SQLiteTaskOrchestrator] 姝ｅ湪鍏抽棴...');
    this.running = false;
    await Promise.all(this.workers);
    this.db.close();
    console.log('[SQLiteTaskOrchestrator] 宸插叧闂?);
  }
}
