const { Router } = require("express");
const DietController = require("../Controllers/DietController");

const routerDiet = Router();

routerDiet.get("/", DietController.findDiets);

module.exports = routerDiet;
