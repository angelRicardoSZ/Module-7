const express = require("express");
const movieApiController = require("../../controllers/api/moviesController");

const router = express.Router();



router.post("/", movieApiController.create);


module.exports = router;

