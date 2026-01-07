const Recipe = require("../models/Recipe");

// GET all recipes
exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
};

// GET single recipe
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json(recipe);
    } catch (error) {
        res.status(400).json({ message: "Invalid Recipe ID" });
    }
};

// CREATE recipe
exports.createRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json({
            message: "Recipe created successfully",
            recipe
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create recipe" });
    }
};

// UPDATE recipe
exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({
            message: "Recipe updated successfully",
            recipe
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update recipe" });
    }
};

// DELETE recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete recipe" });
    }
};
