const express = require("express");
const router = express.Router();
const {getTasks,getTask,searchResult,addTask,editTask,deleteTask} = require("../controllers/task-controller");

router.get("/",getTasks)
router.get("/task/:id", getTask);
router.post("/", addTask);
router.post("/search", searchResult);
router.put("/:id",editTask )
router.delete("/:id",deleteTask )

module.exports = router;
