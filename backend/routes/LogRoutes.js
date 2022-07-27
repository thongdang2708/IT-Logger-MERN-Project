
const express = require("express");

const {getAllLogs, createLog, deleteLog} = require("../controllers/logControllers");

const router = express.Router();

router.route("/").get(getAllLogs).post(createLog);
router.route("/:id").delete(deleteLog);

module.exports = router;