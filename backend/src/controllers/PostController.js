const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");
    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    //remove a extesao
    const [name, ext] = image.split(".");
    // insere a extensao
    const fileName = `${name}.jpg`;

    // converte a imagem para um tamanho menor
    await sharp(req.file.path)
      .resize(500)
      .jpeg()
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    // apaga a imagem original
    fs.unlinkSync(req.file.path);

    // cria o post
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};