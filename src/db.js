const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync(path.join(__dirname, "..", "data.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  );
`);

const todoCount = db.prepare("SELECT COUNT(*) AS c FROM todos").get().c;
if (todoCount === 0) {
  const insertTodo = db.prepare(
    "INSERT INTO todos (title, completed) VALUES (?, ?)"
  );
  insertTodo.run("API 명세서 초안 작성", 1);
  insertTodo.run("로그인 기능 구현", 0);
  insertTodo.run("DB 스키마 설계", 1);
  insertTodo.run("코드리뷰 요청하기", 0);
  insertTodo.run("배포 파이프라인 점검", 0);
}

module.exports = db;
