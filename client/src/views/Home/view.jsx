import React, { useEffect, useState } from "react";
import { apiRecipes, apiRecipesDB } from "../../services/api";
import RecipeCard from "../../components/RecipeCard";
import { addRecipesAction } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Logo from "../../assets/images/CooksnmoreLogo.svg";

import "./styles.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [isAll, setIsAll] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGluttenFree, setIsGluttenFree] = useState(false);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para controlar a ordenação
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function handleRecipeSearch({ target }) {
    setRecipeSearch(target.value);
  }

  function handleIsAll({ target }) {
    setIsAll(target.checked);
    setIsVegetarian(false);
    setIsVegan(false);
    setIsGluttenFree(false);
  }

  function handleIsVegetarian({ target }) {
    setIsVegetarian(target.checked);
    setIsAll(false);
  }

  function handleIsVegan({ target }) {
    setIsVegan(target.checked);
    setIsAll(false);
  }

  function handleIsGluttenFree({ target }) {
    setIsGluttenFree(target.checked);
    setIsAll(false);
  }

  const itemsPerPage = 6; // Número de receitas por página
  const [currentPage, setCurrentPage] = useState(1);

  // Função para ir para página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Função para ir para a próxima página
  const goToNextPage = () => {
    if (currentPage < Math.ceil(recipes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filterDietType = () => {
    if (isAll) {
      setRecipesToShow(recipes);
      return;
    }
    const filterRecipe = recipes.filter((recipe) => {
      return (
        !!(
          recipe.vegetarian === isVegetarian ||
          recipe.diets.includes("Vegetarian")
        ) &&
        (!!recipe.vegan === isVegan || recipe.diets.includes("Vegan")) &&
        (!!recipe.glutenFree === isGluttenFree ||
          recipe.diets.includes("Gluten-Free"))
      );
    });

    setRecipesToShow(filterRecipe);
  };

  // Função para alterar a ordem da ordenação
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Função para ordenar as receitas com base no estado sortOrder
  const sortedRecipes = recipesToShow
    ?.filter((recipe) => {
      return recipe?.title.toUpperCase().includes(recipeSearch?.toUpperCase());
    })
    .sort((a, b) => {
      const compareValue = sortOrder === "asc" ? 1 : -1;
      return a.title.localeCompare(b.title) * compareValue;
    });

  useEffect(() => {
    async function requestRecipes() {
      try {
        //Busca das receitas da API
        setIsLoading(true);
        const responseAPI = await apiRecipes.get();

        //Busca das receitas do Banco
        const responseDB = await apiRecipesDB.get("/all");

        const data = [...responseDB.data, ...responseAPI.data.results];
        console.log({ data });
        setRecipes(data);
        dispatch(addRecipesAction(data));
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    }
    requestRecipes();
  }, []);

  useEffect(() => {
    // Calcula os índices de início e fim da página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Filtra as receitas para mostrar na página atual
    setRecipesToShow(recipes.slice(startIndex, endIndex));
  }, [recipes, currentPage]);

  return (
    <div className="containerHome">
      <header>
        <img className="logoEntry" src={Logo} alt="logo" />
      </header>
      <div className="filterRecipes">
        <div>
          <button className="buttonOrder" onClick={toggleSortOrder}>
            {sortOrder === "asc" ? "bajando" : "subiendo"}
          </button>
          <input
            type="text"
            className="inputFilter"
            onChange={handleRecipeSearch}
            placeholder="Buscar por receta"
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleIsAll}
              name="all"
              checked={isAll}
            />
            All
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleIsVegetarian}
              name="vegatarian"
              checked={isVegetarian}
            />
            Vegatarian
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleIsVegan}
              name="vegan"
              checked={isVegan}
            />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleIsGluttenFree}
              name="glutenfree"
              checked={isGluttenFree}
            />
            Gluten Free
          </label>
          <button className="buttonFilter" onClick={filterDietType}>
            Filtrar
          </button>
        </div>
      </div>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="listRecipes">
          <div className="containerCardRecipe">
            {sortedRecipes.map((recipe) => {
              console.log({ recipe });
              return (
                <RecipeCard
                  key={`${recipe.id} ${recipe.title}`}
                  title={recipe.title}
                  image={recipe.image}
                  id={recipe.id}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="paginationRecipe">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Pagina Anterior
        </button>
        <span>Pagina {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= Math.ceil(recipes.length / itemsPerPage)}
        >
          Pagina Siguiente
        </button>
      </div>
    </div>
  );
}
