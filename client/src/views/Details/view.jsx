import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../assets/images/CooksnmoreLogo.svg";
import "./styles.css";

export default function Details() {
  const [recipe, setRecipe] = useState({});
  const [instruction, setInstruction] = useState([]);
  const data = useSelector((state) => state.recipes);
  let { id } = useParams();

  useEffect(() => {
    const result = data?.find((recipe) => Number(recipe.id) === Number(id));
    console.log(data, result);
    setRecipe(result);
    setInstruction(
      result?.type === "DB"
        ? result?.steps
        : result?.analyzedInstructions[0].steps
    );
  }, [data]);

  // useEffect(() => {
  //   async function detailsRecipe() {
  //     try {
  //       //Busca detalhe da receita
  //       console.log("etrou");
  //       const responseAPI = await apiRecipesDB.get(
  //         `/${id}?apiKey=6abd4c23bb234435b3a2256d5660d9f7&addRecipeInformation=true`
  //       );
  //       console.log(responseAPI);
  //       setRecipe(responseAPI);
  //       setInstruction(responseAPI?.analyzedInstructions[0].steps);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   }
  //   detailsRecipe();
  // }, []);

  return (
    <div className="containerDetails">
      <header>
        <img className="logoEntry" src={Logo} alt="logo" />
      </header>
      <div className="containerInfoDetails">
        <div className="resumeDetails">
          <img src={recipe?.image} alt="recipe" />
          <p>{recipe?.id}</p>
          <p>{recipe?.title}</p>
        </div>
        <div className="contentResume">
          {recipe?.type === "DB" ? (
            <p>{recipe?.summary}</p>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: recipe?.summary }}></p>
          )}
          <ul>
            <li>HealthScore: {recipe?.healthScore}</li>
            {recipe?.diets?.map((diet) => (
              <li key={diet}>{diet}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="recipeTutorial">
        {recipe.type === "DB" ? (
          <>
            <ul className="ingredients">
              <h2>Ingredientes</h2>
              {instruction.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <ul className="recipe">
              <h2>Paso a Paso</h2>
              {instruction?.pasos.map((paso) => (
                <li key={paso}>{paso}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <ul className="ingredients">
              <h2>Ingredientes</h2>
              {instruction?.map((inst) => (
                <>
                  {inst.ingredients.map((ing) => (
                    <li key={ing.name}>{ing.name}</li>
                  ))}
                </>
              ))}
            </ul>
            <ul className="recipe">
              <h2>Paso a Paso</h2>
              {instruction?.map((inst) => (
                <li key={inst.step}>{inst.step}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
