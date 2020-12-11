//jshint esversion:6

// REQUIRE MODULES
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

// MONGODB ATLAS INTEGRATION require modules
// const mongoose = require("mongoose")

// DEMO CONTENT

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = []

// MONGODB ATLAS INTEGRATION connect to database

// mongoose.connect("mongodb+srv://" + process.env.ADMIN_USER + ":" + process.env.ADMIN_PASS + "@cluster0.iy1oa.mongodb.net/blogWebsite", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// CONFIGURE MODULES

// MONGODB ATLAS INEGRATION configure modules
//
// mongoose.set('useFindAndModify', false);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// MONGODV ATLAS INTEGRATION create collection

// const blogPostSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });
//
// const Post = mongoose.model("Post", blogPostSchema);

// HOME ROUTE

app.get("/", function(req, res) {

  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts
  });

  // MONGODB ATLAS INTEGRATION

  // Post.find({}, function (err, foundPosts){
  //   res.render("home", {
  //     homeContent: homeStartingContent,
  //     posts: foundPosts,
  //   });
  // });
});

// CREATE NEW POST ROUTE

app.get("/posts/:newPost", function(req, res) {

  posts.forEach(post => {
    const postTitle = post.title
    const urlPostTitle = req.params.newPost
    const postContent = post.content

    if (_.lowerCase(postTitle) === _.lowerCase(urlPostTitle)) {
      res.render("post", {
        postTitle: postTitle,
        postContent: postContent
      })
    }
  })
  // MONGODB ATLAS INTEGRATION

  // Post.find({}, function (err, foundPosts){
  //   foundPosts.forEach(function(foundPost) {
  //     const postTitle = foundPost.title
  //     const urlPostTitle = req.params.newPost
  //     const postContent = foundPost.content
  //
  //     if (_.lowerCase(postTitle) === _.lowerCase(urlPostTitle)) {
  //       res.render("post", {
  //           postTitle: postTitle,
  //           postContent: postContent
  //         });
  //       };
  //   });
  // });


});

// ABOUT ROUTE

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

// CONTACT ROUTE

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

// COMPOSE ROUTE

app.get("/compose", function(req, res) {
  res.render("compose");
});

// COMPOSE POST ROUTE

app.post("/compose", function(req, res) {

  const postTitle = req.body.newPostTitle
  const postContent = req.body.newPostBody

  posts.push({
    title: postTitle,
    content: postContent
  })

  res.redirect("/")

  // MONGODB ATLAS INTEGRATION

  // const addedPost = new Post({
  //   title: postTitle,
  //   content: postContent
  // });
  //
  // addedPost.save(function(err){
  //   if(!err){
  //     res.redirect("/")
  //   }
  //   else{
  //     console.log(err);
  //   }
  // });
});


// SERVER
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started");
});
