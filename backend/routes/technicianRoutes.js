
const express = require("express");

const {getAllTech, createTech, deleteTech} = require("../controllers/technicianControllers");
const router = express.Router();

router.route("/").get(getAllTech).post(createTech);
router.route("/:id").delete(deleteTech);


module.exports = router;