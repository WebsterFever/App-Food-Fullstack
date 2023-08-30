const models = require("../db");
const { DietFormat } = require("../utils/DietFormat");
const { addDiets } = require("./DietService");

const findRecipes = async (ID) => {
  try {
    const RecipeDoc = await models.Recipe.findByPk(ID);
    return RecipeDoc;
  } catch (e) {
    throw new Error(e.message);
  }
};

const findRecipeByName = async ({ name }) => {
  try {
    const RecipeDoc = await models.Recipe.findOne({
      where: {
        Nombre: name,
      },
    });

    return RecipeDoc;
  } catch (e) {
    throw new Error(e.message);
  }
};

const addRecipe = async (data) => {
  try {
    const RecipeDoc = await models.Recipe.create({ ...data });
    await addDiets(RecipeDoc.ID, {
      isVegetarian: data.isVegetarian,
      isVegan: data.isVegan,
      isGluttenFree: data.isGluttenFree,
    });
    return RecipeDoc;
  } catch (e) {
    throw new Error(e.message);
  }
};

const formatSteps = (steps) => {
  const ingredients = steps.ingredients.split(",");
  const pasos = steps.paso.split(",");
  return { ingredients, pasos };
};

const getRecipes = async () => {
  try {
    const RecipeDoc = await models.Recipe.findAll({
      include: models.Diet,
    });
    const data = RecipeDoc.map((recipeDoc) => {
      console.log({ RecipeDoc: recipeDoc });
      const formatRecipeDoc = {
        id: recipeDoc.ID,
        image: recipeDoc.Imagen,
        title: recipeDoc.Nombre,
        summary: recipeDoc.ResumenDelPlato,
        healthScore: recipeDoc.healthScore,
        steps: formatSteps(recipeDoc.PasoAPaso),
        type: "DB",
        diets: DietFormat(recipeDoc.Diets),
      };
      return formatRecipeDoc;
    });
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  findRecipes,
  addRecipe,
  findRecipeByName,
  getRecipes,
};
