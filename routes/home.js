const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Express Demo Course Api");
});

module.exports = router;
