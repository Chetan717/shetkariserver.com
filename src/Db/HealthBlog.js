const mongoose = require("mongoose");
const HealthBlogModel = new mongoose.Schema({},{ "strict": false});

const HealthBlog = new mongoose.model("HealthBlogModel", HealthBlogModel);

module.exports = HealthBlog;