/**
 * Turso Provider
 * - Turso 完全兼容 SQLite，复用 sqliteMigrations
 * - 将初始化/迁移职责从入口文件移入 provider，便于未来扩展
 */

import { tursoDialect } from "../dialects/tursoDialect.js";
import { applyMigrations } from "../migrations/runner.js";
import { sqliteMigrations } from "../migrations/sqlite/index.js";

export const tursoProvider = {
  name: "turso",
  dialect: tursoDialect,

  /**
   * 确保数据库结构可用（初始化/迁移）
   * @param {{ db:any, dialect:any, env:any, providerName:string }} runtime
   */
  async ensureReady(runtime) {
    // Turso 完全兼容 SQLite，复用 SQLite 迁移脚本
    await applyMigrations(runtime, sqliteMigrations);
  },
};
