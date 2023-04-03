const mongoose = require("mongoose");
const FarmBlogModel = new mongoose.Schema({},{ "strict": false});

const FarmBlog = new mongoose.model("FarmBlogModel", FarmBlogModel);

module.exports = FarmBlog;