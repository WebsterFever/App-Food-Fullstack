const models = require("../db");

const addDiets = async (ID, diets) => {
  try {
    await models.Diet.create({ ID, Nombre: diets });
  } catch (e) {
    throw new Error(e.message);
  }
};

const findDiets = async () => {
  try {
    const dietDoc = await models.Diet.findAll();
    return dietDoc;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  findDiets,
  addDiets,
};
