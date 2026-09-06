const express = require("express");
const todosRouter = require("./routes/todos");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "todo-api-demo", status: "ok" });
});

app.use("/todos", todosRouter);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`todo-api-demo listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
