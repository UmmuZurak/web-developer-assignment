import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), 'data.db');

export const connection = new Database(dbPath, { 
  readonly: true,
  fileMustExist: true 
});