const RecipeService = require("../Services/RecipeService");

const findRecipes = async (req, res, next) => {
  try {
    const id = req.params;

    const recipeDoc = await RecipeService.findRecipes(id);

    return res.status(200).json(recipeDoc);
  } catch (e) {
    next(e);
  }
};

const findRecipeByName = async (req, res, next) => {
  try {
    const name = req.query;

    const recipeDoc = await RecipeService.findRecipeByName(name);

    return res.status(200).json(recipeDoc);
  } catch (e) {
    next(e);
  }
};

const addRecipe = async (req, res, next) => {
  try {
    const data = req.body;
    const recipeDoc = await RecipeService.addRecipe(data);
    res.status(200).json(recipeDoc);
  } catch (e) {
    next(e);
  }
};

const getRecipes = async (_req, res, next) => {
  try {
    const recipeDoc = await RecipeService.getRecipes();

    return res.status(200).json(recipeDoc);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  findRecipes,
  addRecipe,
  findRecipeByName,
  getRecipes,
};
