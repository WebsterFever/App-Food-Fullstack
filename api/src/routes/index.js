const { Router } = require("express");
const routerRecipe = require("./recipes");
const routerDiet = require("./diet");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", routerRecipe);
router.use("/diets", routerDiet);

module.exports = router;
