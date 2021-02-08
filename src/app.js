require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const FoldersRouter = require("./folders/folders-router");
const NotesRouter = require("./notes/notes-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({ origin: "https://noteful-client-pink.vercel.app/" }));

app.use("/folders", FoldersRouter);
app.use("/notes", NotesRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  console.error(error);
  res.status(500).json(response);
});
module.exports = app;
