const moongose = require("mongoose");

const PostSchema = new moongose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    imagesmall: String,
    aspectratio: {
      type: Number,
      default: 1
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = moongose.model("Post", PostSchema);
