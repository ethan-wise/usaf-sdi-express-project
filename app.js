const express = require("express");
const app = express();
const students = require("./students.json");

app.get("/students", (req, res) => {
  const query = req.query.name;
  if (query != undefined) {
    res.send(students.filter((obj) => obj.name[0] === req.query.name));
  } else {
    res.send(students);
  }
});

app.get("/students/:studentId", (req, res) => {
  const userId = req.params.studentId;
  res.send(students.filter((obj) => obj.id == userId));
});

app.get("/grades/:studentId", (req, res) => {
  const userId = req.params.id;
  res.send(students.filter((obj) => obj.id == userId));
});

app.post("/grades", (req, res) => {
  const postBody = req.body;
  if (typeof postBody[0] === "number" && typeof postBody[1] === "object") {
    const student = students.filter((student) => student.id === postBody[0]);
    const studentClasses = Object.keys(postBody[1]);
    for (var prop in postBody[1]) {
      student.grades[prop] = postBody[1].prop;
    }
    res.send("Posted!");
  } else {
    res.send("Failed to Post");
  }
});

app.post("/register", (req, res) => {
  const postBody = req.body;
  if (typeof postBody === "object") {
    students.push(postBody);
    res.send("Posted!");
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
