const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

// Read the Courses.
router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course) {
    res.send(course);
    return;
  } else {
    res.status(404).send("This Course Is Not Found on Server.");
    return;
  }
});

// Create The Course.
router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  } else if (value) {
    const course = {
      id: courses.length + 1,
      name: value.name,
    };
    courses.push(course);
    res.send(course);
    return;
  }
});

// Update the Course.
router.put("/:id", (req, res) => {
  // Find the Given Course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course with this id cannot Found");
    return;
  }
  // Validate the Course
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // if both above are true then update the course.
  else {
    course.name = req.body.name;
    res.send(course);
    return;
  }
});

// Delete Request
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Course With Given Id Is Not Found.");
  } else {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.send(course);
  }
});

module.exports = router;
