const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Recipes API",
    endpoints: {
      getAll: "/recipes",
      getOne: "/recipes/:id"
    }
  });
});

app.use("/recipes", require("./routes/recipeRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
