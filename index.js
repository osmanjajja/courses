const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.use(express.json());
app.use("/api/courses", courses);
app.use("/", home);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}.....`);
});
