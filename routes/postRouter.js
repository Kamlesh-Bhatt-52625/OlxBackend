const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/postModel");

postRouter.post("/", async (req, res) => {
  try {
    const { name, description, category, image, location, postedAt, price } =
      req.body;
    console.log(name, " name");
    console.log(description, " description");
    console.log(category, " category");
    console.log(image, " image");
    console.log(location, " location");
    console.log(postedAt, " date");
    console.log(price, " price");

    const postedItem = new PostModel({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price,
    });

    await postedItem.save();
    res.json({ message: "Posted" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error Posting" });
  }
});

postRouter.patch("/edit/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, description, category, image, location, postedAt, price } =
      req.body;
    const updatedData = new PostModel({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price,
    });
    const isValid = await PostModel.findByIdAndUpdate(_id, updatedData);

    // console.log(isValid);
    if (!isValid) {
      res.json({ message: "Wrong Id" });
    }
    res.json(isValid);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error Editing" });
  }
});

postRouter.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const isValid = await PostModel.findByIdAndRemove(_id);

    // console.log(isValid);
    if (!isValid) {
      res.json({ message: "Wrong Id" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Error Editing" });
  }
});

module.exports = { postRouter };
