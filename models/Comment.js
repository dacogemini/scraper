// Require mongoose
var mongoose = require("mongoose");
// Create a schema object constructor
var Schema = mongoose.Schema;

// Create the Comment schema
var CommentSchema = new Schema({
  // name is a string that's required 
  name: {
    type: String,
    required: true
  },
  // body is a string that's required
  body: {
    type: String,
    required: true
  }
});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Exports the Comment model
module.exports = Comment;
