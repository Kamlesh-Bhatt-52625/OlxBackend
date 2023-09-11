const express = require("express");
const getRouter = express.Router();
const { PostModel } = require("../models/postModel");

getRouter.get("/", async (req, res) => {
  try {
    const { category, sortBy, page } = req.query;
    // console.log(sortBy, "sortBy");

    const currentPage = parseInt(page) || 1;
    const limitPerPage = 4;

    const skip = (currentPage - 1) * limitPerPage;

    const sort = {};
    const filter = category ? { category } : {};

    if (sortBy) {
      sort.postedAt = -1;
    }

    const data = await PostModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitPerPage);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ message: "Eroor fetching data" });
  }
});

getRouter.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const searchedData = await PostModel.find({ name: q });
    res.json(searchedData);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error Searching" });
  }
});

module.exports = { getRouter };
