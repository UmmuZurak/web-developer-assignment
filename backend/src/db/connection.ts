import Database from "better-sqlite3";
import path from "path";
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';
const dbPath = path.join(process.cwd(), 'data.db');

export const connection = new Database(dbPath, { 
  readonly: true,
  fileMustExist: true 
});