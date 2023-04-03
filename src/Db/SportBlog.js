const mongoose = require("mongoose");
const SportBlogModel = new mongoose.Schema({},{ "strict": false});

const SportBlog = new mongoose.model("SportBlogModel", SportBlogModel);

module.exports = SportBlog;