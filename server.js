const express = require("express");
const mongodb = require("mongodb");

const app = express();
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

const DB_NAME = "recipeDB";
const URL = "mongodb://localhost:27017";
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Recipes API",
    endpoints: {
      getAll: "/recipes",
      getOne: "/recipes/:id"
    }
  });
});

app.get("/recipes", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB_NAME);
    const recipes = await db.collection("recipes").find({}).toArray();
    await connection.close();

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

app.get("/recipes/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB_NAME);

    const recipe = await db.collection("recipes").findOne({
      _id: new ObjectId(req.params.id),
    });

    await connection.close();

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Invalid Recipe ID" });
  }
});

app.post("/recipes", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB_NAME);

    const result = await db.collection("recipes").insertOne(req.body);
    await connection.close();

    res.status(201).json({
      message: "Recipe created successfully",
      recipeId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create recipe" });
  }
});

app.put("/recipes/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB_NAME);

    const result = await db.collection("recipes").findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    await connection.close();

    if (!result.value) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({
      message: "Recipe updated successfully",
      recipe: result.value,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe" });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB_NAME);

    const result = await db.collection("recipes").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    await connection.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
