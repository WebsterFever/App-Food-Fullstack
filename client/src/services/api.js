import axios from "axios";
require("dotenv").config();

export const apiRecipes = axios.create({
  baseURL: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`,
});

export const apiDiet = axios.create({
  baseURL: "http://localhost:3001/diets",
});

export const apiRecipesDB = axios.create({
  baseURL: `http://localhost:3001/recipes`,
});
