export default {
  functions: {
    directory: 'node-functions',
  },
  build: {
    external: [
      'better-sqlite3',
      'mysql2',
      'pg',
      'jsonwebtoken',
      '@tursodatabase/serverless',
    ],
  },
};