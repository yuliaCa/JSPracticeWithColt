const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

// we need to be specific on how to parse req.body. There is no default.
// Below says use midddleware to parse req.body as url encoded data.
app.use(express.urlencoded({ extended: true }));
// to parse JSON data
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "LOL that's funny!",
  },
  {
    id: uuid(),
    username: "Yulia",
    comment: "Oh nice, I would love to do that!",
  },
  {
    id: uuid(),
    username: "Ana",
    comment: "OMG! That's so awesome!",
  },
  {
    id: uuid(),
    username: "Tom",
    comment: "Hello everyone! Nice to be here!",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments/new", (req, res) => {
  // console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // res.send("It must work");
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.patch("/comments/:id", (req, res) => {
  // res.send("updating something");
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect("/comments");
  // res.render("comments/edit");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  // const comment = comments.find((c) => c.id === id);
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

// ****************** tacos part *************
app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { type, number } = req.body;
  res.send(`OK Here is the order: ${type} x ${number}`);
  //   res.send("POST /tacos response");
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});

// REST - Representational State Transfer. Principles on how clients and server should communicate.

//REST Compliant architecture
// GET /comments - list all comments - index route
// POST /comments - create a new comment - create route
// GET /comments/:id - get one comment, using ID - show route
// PATCH /comments/:id - update one comment - update route
// DELETE /comments:id - delete/destroy one comment - delete route.
