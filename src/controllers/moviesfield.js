const MoviesModal = require("../modals/AddMovieModel");

// getting the movies data from the database
const getAllMovies = async (req, res) => {
  let AllMovies = await MoviesModal.find();
  res.status(200).send(AllMovies);
};

// to get req from the client and send the data to the database using post metthod
const createMovies = async (req, res) => {
  try {
    let Movie = new MoviesModal(req.body);
    let result = await Movie.save();
    res.status(200).send("Movie Added Successfuly !");
  } catch (error) {
    res.status(400).send("Something Went Wrong !");
  }
};

// get movies data by their id

const getMoviesById = async (req, res) => {
  try {
    let iddata = await MoviesModal.findOne({ _id: req.params.id });
    if (iddata) {
      res.status(200).send(iddata);
    } else {
      res.send("data no found");
    }
  } catch (error) {
    res.status(400).send("no Found");
  }
};

// update movie by getting id
const updateMovieById = async (req, res) => {
  try {
    const updatedData = await MoviesModal.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedData) {
      res.status(200).send("Movie Data updated sucess !");
    } else {
      res.send("something Went Wrong !");
    }
  } catch (error) {
    res.status(400).send("Update failed");
  }
};

// delete movie by getting id

const deleteMovieById = async (req, res) => {
  try {
    const deletedData = await MoviesModal.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedData) {
      res.status(200).send("Movie Deleted Succesfully !");
    } else {
      res.send("Movie Not Found");
    }
  } catch (error) {
    res.status(400).send("Delete failed");
  }
};

module.exports = {
  getAllMovies,
  createMovies,
  getMoviesById,
  updateMovieById,
  deleteMovieById,
};
