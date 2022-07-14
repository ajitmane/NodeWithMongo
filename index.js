const db = require("./app");
const express = require("express");
const config = require("./config");

const app = express();
const PORT = config.PORT;

const data = [
  { id: 4, name: "Newspaper 1", pages: 10 },
  { id: 5, name: "Newspaper 2", pages: 1 },
  { id: 6, name: "Newspaper 3", pages: 105 },
];

app.get("/", async (req, res) => {
  try {
    const result = await db.loadData(data);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getData", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    console.log("id", id);
    let queryObj = id ? { id } : {};
    console.log("query obj", queryObj);
    const result = await db.getData(queryObj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getData/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    console.log("id", id);
    let queryObj = id ? { id } : {};
    console.log("query obj", queryObj);
    const result = await db.getOneData(queryObj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get("/add", async (req, res) => {
  try {
    const obj = {
      id: 101,
      name: "Newspaper 101",
    };
    const result = await db.addData(obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get("/update/:id", async (req, res) => {
  try {
    const UpdatedObj = {
      name: "Updated Newspaper",
      pages: 120,
    };
    let id = parseInt(req.params.id);
    const result = await db.updateData(id ? id : 101, UpdatedObj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.get("/removeData/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    if (id) {
      const result = await db.remove({ id });
      res.send(result);
    } else {
      res.send({ message: "Please send Id" });
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log("Server Started on port", PORT);
});
