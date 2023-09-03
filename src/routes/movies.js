const express = require("express");

const {
  getMovieTheater,
  getAllMovies,
  getMovie,
  searchMovies,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/_search", searchMovies);
router.get("/:id", getMovie);
router.get("/:name", getMovieTheater);
router.get("/", getAllMovies);

module.exports = router;