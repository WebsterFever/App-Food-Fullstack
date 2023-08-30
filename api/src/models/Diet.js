const { DataTypes } = require("sequelize");

("use strict");
//JSdocs
//
/**
 * @param {import('sequelize').Sequelize } sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Diet = sequelize.define("Diet", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });
  // Diet.associate = (models) => {
  //   Diet.belongsToMany(models.Recipe);
  //   models.Recipe.belongsToMany(Diet);
  // };

  return Diet;
};
