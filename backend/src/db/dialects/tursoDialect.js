/**
 * Turso 方言实现
 * Turso 基于 libSQL（SQLite 分支），完全兼容 SQLite SQL 语法
 * 可直接复用 sqliteDialect 的配置
 */

import { sqliteDialect } from "./sqliteDialect.js";

export const tursoDialect = {
  name: "turso",

  /**
   * Turso 使用 ? 占位符（与 SQLite 相同）
   * @returns {"question"}
   */
  placeholderStyle() {
    return "question";
  },

  /**
   * INSERT IGNORE 的统一语义：冲突时忽略
   * - Turso/libSQL: INSERT OR IGNORE（与 SQLite 相同）
   */
  buildInsertIgnoreSql({ table, columns }) {
    return sqliteDialect.buildInsertIgnoreSql({ table, columns });
  },

  /**
   * 是否支持部分索引（WHERE 子句索引）
   * Turso 支持部分索引
   */
  supportsPartialIndex() {
    return true;
  },

  /**
   * 是否支持窗口函数
   * Turso/libSQL 支持窗口函数
   */
  supportsWindowFunctions() {
    return true;
  },

  /**
   * 是否支持 CTE（Common Table Expressions）
   * Turso/libSQL 支持 CTE
   */
  supportsCTE() {
    return true;
  },
};
