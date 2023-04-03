const mongoose = require("mongoose");
const EduBlogModel = new mongoose.Schema({},{ "strict": false});

const EduBlog = new mongoose.model("EduBlogModel", EduBlogModel);

module.exports = EduBlog;