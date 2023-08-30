import React, { useEffect, useState } from "react";
import { apiRecipesDB } from "../../services/api";
import Logo from "../../assets/images/CooksnmoreLogo.svg";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./styles.css";

export default function Form() {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGluttenFree, setIsGluttenFree] = useState(false);
  const [Nombre, setNombre] = useState("");
  const [Imagen, setImagen] = useState("");
  const [ResumenDelPlato, setResumenDelPlato] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [paso, setPaso] = useState("");
  const [ingredients, setIngredientes] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  function handleNombre({ target }) {
    setNombre(target.value);
  }

  function handleImagen({ target }) {
    setImagen(target.value);
  }

  function handleResumenDelPlato({ target }) {
    setResumenDelPlato(target.value);
  }

  function handleHealthScore({ target }) {
    setHealthScore(target.value);
  }

  function handleIngredientes({ target }) {
    setIngredientes(target.value);
  }

  function handlePaso({ target }) {
    setPaso(target.value);
  }

  function handleIsVegetarian({ target }) {
    setIsVegetarian(target.checked);
  }

  function handleIsVegan({ target }) {
    setIsVegan(target.checked);
  }

  function handleIsGluttenFree({ target }) {
    setIsGluttenFree(target.checked);
  }

  async function addRecipe(event) {
    event.preventDefault();
    const data = {
      Nombre,
      Imagen,
      ResumenDelPlato,
      healthScore,
      PasoAPaso: {
        ingredients,
        paso,
      },
      isVegetarian,
      isVegan,
      isGluttenFree,
    };
    console.log({ data });
    await apiRecipesDB.post("", data);
    alert("Receita criada com sucesso.");
  }

  function validation() {
    if (
      Nombre &&
      Imagen &&
      ResumenDelPlato &&
      healthScore &&
      ingredients &&
      paso
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    validation();
  }, [Nombre, Imagen, ResumenDelPlato, healthScore, ingredients, paso]);

  return (
    <form className="Form" onSubmit={addRecipe}>
      <header>
        <img className="logoEntry" src={Logo} alt="logo" />
      </header>
      <div className="containerLinkReceta">
        <Link to="/">
          <BsArrowBarLeft />
          <p>Volver</p>
        </Link>
      </div>
      <div className="containerForm">
        <div className="infoContainer">
          <h2>Datos</h2>
          <label>
            <p>Nombre</p>
            <input
              className="inputTextForm"
              type="text"
              value={Nombre}
              onChange={handleNombre}
            />
          </label>
          <label>
            <p>Resumen del plato</p>
            <textarea
              className="textAreaForm"
              rows="5"
              cols="40"
              type="text"
              value={ResumenDelPlato}
              onChange={handleResumenDelPlato}
            />
          </label>
          <label>
            <p>Nivel de comida saludable</p>
            <input
              className="inputTextForm"
              type="number"
              value={healthScore}
              onChange={handleHealthScore}
            />
          </label>
          <label>
            <p>Url Imagen</p>
            <input
              className="inputTextForm"
              type="text"
              value={Imagen}
              onChange={handleImagen}
            />
          </label>
        </div>
        <div className="infoContainer">
          <h2>Receta</h2>
          <label>
            <p>Ingredientes</p>
            <textarea
              className="textAreaForm"
              rows="5"
              cols="40"
              type="text"
              value={ingredients}
              onChange={handleIngredientes}
            />
          </label>
          <label>
            <p>Paso a paso</p>
            <textarea
              className="textAreaForm"
              rows="5"
              cols="40"
              type="text"
              value={paso}
              onChange={handlePaso}
            />
          </label>

          <div className="containerDiets">
            <label>
              <input
                type="checkbox"
                onChange={handleIsVegetarian}
                name="vegatarian"
                checked={isVegetarian}
              />
              <p>Vegatarian</p>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleIsVegan}
                name="vegan"
                checked={isVegan}
              />
              <p>Vegan</p>
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleIsGluttenFree}
                name="glutenfree"
                checked={isGluttenFree}
              />
              <p>Gluten Free</p>
            </label>
          </div>
          <div className="containerButton">
            <button disabled={isDisabled} type="submit">
              CREAR RECETA
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
