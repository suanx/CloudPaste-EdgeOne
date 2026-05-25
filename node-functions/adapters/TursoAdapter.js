// TursoAdapter - 基于 @tursodatabase/serverless SDK 的适配器
// Turso 基于 libSQL（SQLite 分支），完全兼容 SQLite SQL 语法
// 使用 HTTP SDK，零原生依赖，适合 EdgeOne/Cloudflare 环境

import { createLogger } from "../utils/logger.js";

/**
 * Turso 数据库适配器
 * 模拟 D1/SQLite 接口以保持代码兼容性
 */
export class TursoAdapter {
  /**
   * @param {Object} config - Turso 连接配置
   * @param {string} config.url - Turso 数据库 URL (libsql://your-db-name-your-org.turso.io)
   * @param {string} config.authToken - Turso 认证令牌
   * @param {any} [config.env] - 环境变量对象（用于日志配置）
   */
  constructor(config) {
    this.config = config;
    this.client = null;
    this.logger = createLogger("Turso", config.env || {});
  }

  /**
   * 初始化 Turso 连接
   */
  async init() {
    const startTime = Date.now();
    this.logger.info("开始初始化 Turso 连接", {
      url: this.config.url,
    });

    try {
      // 动态导入 @tursodatabase/serverless，仅在需要时加载
      const { createClient } = await import("@tursodatabase/serverless");

      this.client = createClient({
        url: this.config.url,
        authToken: this.config.authToken,
      });

      // 健康检查
      await this._healthCheck();

      this.logger.perf("Turso 连接初始化", startTime);
      return this;
    } catch (error) {
      this.logger.error("Turso 连接初始化失败", error);
      throw new Error(`Turso 连接失败: ${error.message}`);
    }
  }

  /**
   * 健康检查 - 测试数据库连接
   * @private
   */
  async _healthCheck() {
    this.logger.db("执行健康检查");
    try {
      // Turso 客户端自带连接测试，执行一个简单的 SELECT 1
      const result = await this.client.execute("SELECT 1");
      if (!result || result.rows.length === 0) {
        throw new Error("健康检查返回空结果");
      }
      this.logger.db("健康检查通过");
    } catch (error) {
      this.logger.error("健康检查失败", error);
      throw error;
    }
  }

  /**
   * 准备 SQL 语句（模拟 D1 接口）
   * @param {string} sql - SQL 语句
   */
  prepare(sql) {
    const logger = this.logger;
    const client = this.client;

    return {
      sql,
      params: [],

      bind(...args) {
        this.params = args;
        return this;
      },

      async run() {
        const startTime = Date.now();
        try {
          logger.db("执行 SQL (run)", { operation: "run" });
          logger.sql(sql, params);

          const result = await client.execute({
            sql,
            params: params.length > 0 ? params : undefined,
          });

          logger.sql(sql, params, Date.now() - startTime);
          logger.db("SQL 执行成功 (run)", {
            changes: result.rowsAffected || 0,
            lastInsertRowid: result.lastInsertRowid || null,
            duration_ms: Date.now() - startTime,
          });

          return {
            success: true,
            changes: result.rowsAffected || 0,
            meta: {
              changes: result.rowsAffected || 0,
              last_row_id: result.lastInsertRowid || null,
            },
          };
        } catch (error) {
          logger.error("SQL 执行失败 (run)", {
            sql,
            params,
            error: error.message,
            duration_ms: Date.now() - startTime,
          });
          throw error;
        }
      },

      async all() {
        const startTime = Date.now();
        try {
          logger.db("执行 SQL (all)", { operation: "all" });
          logger.sql(sql, params);

          const result = await client.execute({
            sql,
            params: params.length > 0 ? params : undefined,
          });

          logger.sql(sql, params, Date.now() - startTime);
          logger.db("SQL 执行成功 (all)", {
            rowCount: result.rows.length,
            duration_ms: Date.now() - startTime,
          });

          return { results: result.rows };
        } catch (error) {
          logger.error("SQL 执行失败 (all)", {
            sql,
            params,
            error: error.message,
            duration_ms: Date.now() - startTime,
          });
          throw error;
        }
      },

      async first() {
        const startTime = Date.now();
        try {
          logger.db("执行 SQL (first)", { operation: "first" });
          logger.sql(sql, params);

          const result = await client.execute({
            sql,
            params: params.length > 0 ? params : undefined,
          });

          const row = result.rows.length > 0 ? result.rows[0] : null;

          logger.sql(sql, params, Date.now() - startTime);
          logger.db("SQL 执行成功 (first)", {
            found: !!row,
            duration_ms: Date.now() - startTime,
          });

          return row;
        } catch (error) {
          logger.error("SQL 执行失败 (first)", {
            sql,
            params,
            error: error.message,
            duration_ms: Date.now() - startTime,
          });
          throw error;
        }
      },
    };
  }

  /**
   * 批量执行 SQL 语句（事务）
   * @param {Array} statements - SQL 语句数组
   */
  async batch(statements) {
    const startTime = Date.now();
    this.logger.db("开始批量执行 SQL", { statementCount: statements.length });

    try {
      // Turso 使用 executeBatch 进行批量执行（自动事务）
      // 将 statements 转换为 Turso 的格式
      const batchStatements = statements.map((statement) => {
        if (typeof statement === "string") {
          return { sql: statement, args: [] };
        } else if (statement.sql || statement.text) {
          return {
            sql: statement.sql || statement.text,
            args: statement.params || [],
          };
        } else {
          throw new Error("Invalid statement format for batch");
        }
      });

      const results = await this.client.executeBatch(batchStatements);

      // 将 Turso 的批量结果转换为统一格式
      const formattedResults = results.map((result, index) => ({
        success: true,
        result,
        meta: {
          changes: result.rowsAffected || 0,
          last_row_id: result.lastInsertRowid || null,
        },
      }));

      this.logger.perf("批量 SQL 执行完成", startTime, {
        statementCount: statements.length,
        totalResults: formattedResults.length,
      });

      return formattedResults;
    } catch (error) {
      this.logger.error("批量执行失败", error);
      throw error;
    }
  }

  /**
   * 执行原始 SQL（不推荐用于生产，主要用于迁移）
   * @param {string} sql - SQL 语句
   */
  async exec(sql) {
    const startTime = Date.now();
    this.logger.db("执行原始 SQL (exec)");

    try {
      // Turso 的 execute 支持单条语句
      // 对于多条语句，需要手动分割
      const statements = this._splitSqlStatements(sql);

      this.logger.db("原始 SQL 已分割", { statementCount: statements.length });

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (statement.trim()) {
          this.logger.sql(statement, []);
          await this.client.execute(statement);
          this.logger.db(`语句 ${i + 1}/${statements.length} 执行成功`);
        }
      }

      this.logger.perf("原始 SQL 执行完成", startTime, {
        statementCount: statements.length,
      });
      return { success: true };
    } catch (error) {
      this.logger.error("原始 SQL 执行失败", error);
      throw error;
    }
  }

  /**
   * 分割 SQL 语句 - 考虑字符串中的分号
   * @private
   * @param {string} sql - 包含多条语句的 SQL
   * @returns {Array<string>} SQL 语句数组
   */
  _splitSqlStatements(sql) {
    const statements = [];
    let current = "";
    let inString = false;
    let stringChar = null;
    let escaped = false;

    for (let i = 0; i < sql.length; i++) {
      const char = sql[i];

      if (escaped) {
        current += char;
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        current += char;
        continue;
      }

      if ((char === "'" || char === '"') && !inString) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (char === stringChar && inString) {
        inString = false;
        stringChar = null;
        current += char;
      } else if (char === ";" && !inString) {
        if (current.trim()) {
          statements.push(current.trim());
        }
        current = "";
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      statements.push(current.trim());
    }

    return statements;
  }

  /**
   * 获取连接状态
   * @returns {Object} 连接状态信息
   */
  getStatus() {
    if (!this.client) {
      return null;
    }

    return {
      connected: true,
      url: this.config.url,
      // Turso 客户端不提供详细的连接池状态
      // 因为它是 HTTP 基于的，无状态连接
    };
  }

  /**
   * 关闭连接
   * Turso 客户端基于 HTTP，无需显式关闭连接池
   * 但提供此方法以保持一致性
   */
  async close() {
    if (this.client) {
      this.logger.info("关闭 Turso 连接");
      // Turso 客户端无需显式关闭
      // HTTP 连接由底层库管理
      this.client = null;
      this.logger.info("Turso 连接已关闭");
    }
  }
}

/**
 * 从环境变量创建 Turso 适配器
 * @param {Object} env - 环境变量对象
 * @returns {Promise<TursoAdapter>} Turso 适配器实例
 */
export async function createTursoAdapterFromEnv(env) {
  const logger = createLogger("Turso", env);

  // 支持多种环境变量命名格式
  const config = {
    url: env.TURSO_DATABASE_URL || env.TURSO_URL || env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN || env.TURSO_TOKEN || env.AUTH_TOKEN,
    env, // 传递环境变量用于日志配置
  };

  logger.info("从环境变量创建 Turso 适配器", {
    url: config.url,
  });

  // 验证必需的配置
  if (!config.url || !config.authToken) {
    const missingFields = [];
    if (!config.url) missingFields.push("TURSO_DATABASE_URL");
    if (!config.authToken) missingFields.push("TURSO_AUTH_TOKEN");

    logger.error("Turso 配置不完整", { missingFields });
    throw new Error(
      `Turso 配置不完整。缺少以下环境变量: ${missingFields.join(", ")}`
    );
  }

  const adapter = new TursoAdapter(config);
  await adapter.init();
  return adapter;
}

/**
 * 工厂函数：创建并初始化 Turso 适配器
 * @param {Object} config - Turso 配置对象
 * @returns {Promise<TursoAdapter>} Turso 适配器实例
 */
export async function createTursoAdapter(config) {
  const adapter = new TursoAdapter(config);
  await adapter.init();
  return adapter;
}
