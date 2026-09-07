const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

const SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username, password는 필수입니다." });
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const result = db
    .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    .run(username, hashed);

  res.status(201).json({ id: result.lastInsertRowid, username });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." });
  }

  res.json({ ok: true, username: user.username });
});

module.exports = router;
