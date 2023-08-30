const DietService = require("../Services/DietService");

const findDiets = async (_req, res, next) => {
  try {
    const dietDoc = await DietService.findDiets();

    return res.status(200).json(dietDoc);
  } catch (e) {
    next(e);
  }
};

const addDiets = async (id, diets) => {
  try {
    const recipeDoc = await RecipeService.addDiets(diets);
    res.status(200).json(recipeDoc);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  findDiets,
  addDiets,
};
