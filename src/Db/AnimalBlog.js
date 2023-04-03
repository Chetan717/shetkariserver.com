const mongoose = require("mongoose");
const AnimalBlog = new mongoose.Schema({},{ "strict": false});

const AnimalBlogModel = new mongoose.model("AnimalBlog", AnimalBlog);

module.exports = AnimalBlogModel;