const express = require("express");
const {} = require("./config/db");
const { postRouter } = require("./routes/postRouter");
const { getRouter } = require("./routes/getRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to OLX! use /get , /post , /post/edit/:id, /post/delete/:id");
});

const PORT = process.env.PORT;
// console.log(PORT);

app.use("/post", postRouter);
app.use("/get", getRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DATABASE");
  } catch (error) {
    console.log("Error connecting to the DATABASE!");
    console.log(error);
  }
  console.log(`Server is live on port ${PORT}`);
});
