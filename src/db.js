const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync(path.join(__dirname, "..", "data.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todos(id)
  );

  CREATE INDEX IF NOT EXISTS idx_comments_todo_id ON comments(todo_id);
`);

const todoCount = db.prepare("SELECT COUNT(*) AS c FROM todos").get().c;
if (todoCount === 0) {
  const insertTodo = db.prepare(
    "INSERT INTO todos (title, completed) VALUES (?, ?)"
  );
  const insertComment = db.prepare(
    "INSERT INTO comments (todo_id, body) VALUES (?, ?)"
  );

  const t1 = insertTodo.run("API 명세서 초안 작성", 1);
  const t2 = insertTodo.run("로그인 기능 구현", 0);
  const t3 = insertTodo.run("DB 스키마 설계", 1);
  const t4 = insertTodo.run("코드리뷰 요청하기", 0);
  const t5 = insertTodo.run("배포 파이프라인 점검", 0);

  insertComment.run(t1.lastInsertRowid, "1차 초안 공유했습니다.");
  insertComment.run(t1.lastInsertRowid, "리뷰 반영해서 v2로 업데이트했어요.");
  insertComment.run(t2.lastInsertRowid, "소셜 로그인도 필요할까요?");
  insertComment.run(t3.lastInsertRowid, "정규화 3차까지 진행했습니다.");
  insertComment.run(t3.lastInsertRowid, "인덱스 추가 여부 검토 필요.");
  insertComment.run(t3.lastInsertRowid, "ERD 업데이트했습니다.");
  insertComment.run(t5.lastInsertRowid, "스테이징 배포 확인 완료.");
}

module.exports = db;
