const { Router } = require("express");
const RecipeController = require("../Controllers/RecipeController");

const routerRecipe = Router();

routerRecipe.get("/all", RecipeController.getRecipes);

routerRecipe.get("/", RecipeController.findRecipeByName);

routerRecipe.get("/:idRecipe", RecipeController.findRecipes);

routerRecipe.post("/", RecipeController.addRecipe);

module.exports = routerRecipe;
