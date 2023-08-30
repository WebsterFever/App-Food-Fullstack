function DietFormat(objDiet) {
  const arrayResult = objDiet.map((diet) => {
    const { isVegetarian, isVegan, isGluttenFree } = diet.dataValues.Nombre;
    console.log({ diet: diet.dataValues.Nombre, test: diet.dataValues });
    const dietArray = [];

    if (isVegetarian) {
      dietArray.push("Vegetarian");
    }
    if (isVegan) {
      dietArray.push("Vegan");
    }
    if (isGluttenFree) {
      dietArray.push("Gluten-Free");
    }

    return dietArray;
  });

  return arrayResult.flat();
}

module.exports = {
  DietFormat,
};
