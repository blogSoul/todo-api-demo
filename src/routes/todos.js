const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const todos = db.prepare("SELECT * FROM todos").all();
  res.json(todos);
});

router.get("/:id", (req, res) => {
  const todo = db.prepare("SELECT * FROM todos WHERE id = ?").get(req.params.id);
  res.json({
    id: todo.id,
    title: todo.title,
    completed: !!todo.completed,
  });
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title은 필수 문자열입니다." });
  }

  const result = db
    .prepare("INSERT INTO todos (title, completed) VALUES (?, 0)")
    .run(title);

  res.status(201).json({ id: result.lastInsertRowid, title, completed: false });
});

router.patch("/:id", (req, res) => {
  const { completed } = req.body;

  db.prepare("UPDATE todos SET completed = ? WHERE id = ?").run(
    completed ? 1 : 0,
    req.params.id
  );

  res.json({ ok: true });
});

router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM todos WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

module.exports = router;
