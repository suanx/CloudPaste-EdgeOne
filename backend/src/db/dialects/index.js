import { sqliteDialect } from "./sqliteDialect.js";
import { postgresDialect } from "./postgresDialect.js";
import { mysqlDialect } from "./mysqlDialect.js";
import { tursoDialect } from "./tursoDialect.js";

/** @type {Record<string, any>} */
const DIALECTS = {
  sqlite: sqliteDialect,
  postgres: postgresDialect,
  mysql: mysqlDialect,
  turso: tursoDialect,
};

export function getDialect(name) {
  const key = String(name || "").toLowerCase();
  return DIALECTS[key] || DIALECTS.sqlite;
}

