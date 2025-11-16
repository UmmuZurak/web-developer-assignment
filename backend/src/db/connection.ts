import sqlite3 from "better-sqlite3";
import config from "config";

const dbPath = config.get("dbPath") as string;
export const connection = new sqlite3(dbPath);
