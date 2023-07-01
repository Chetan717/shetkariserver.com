const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovies,
  getMoviesById,
  deleteMovieById,
  updateMovieById,
} = require("../controllers/moviesfield");

// routes for the movies

router.route("/").get(getAllMovies); // route for server
router.route("/AddMovies").post(createMovies); // route for post the data /Ticket/AddTicket
router.route("/:id").get(getMoviesById); // route for get movies by its id using /movies/:id
router.route("/UpdateMovies/:id").put(updateMovieById); // route for put movie data /Ticket/UpdateTicket
router.route("/DeleteMovies/:id").delete(deleteMovieById); // route for delete movie  data /Ticket/deleteTicket

module.exports = router;
