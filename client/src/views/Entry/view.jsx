import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cook from "../../assets/images/orange-cake.png";
import Logo from "../../assets/images/CooksnmoreLogo.svg";

import "./styles.css";

export default function Entry() {
  const history = useHistory();

  function goHome() {
    history.push("/home");
  }

  function goForm() {
    history.push("/form");
  }

  return (
    <div className="containerEntry">
      <header>
        <img className="logoEntry" src={Logo} alt="logo" />
      </header>
      <img className="imgEntry" src={Cook} alt="cooking" />
      <div className="containerEntryButtons">
        <button className="buttonEntryCasa" onClick={goHome}>
          Ir a casa
        </button>
        <button className="buttonEntryCrear" onClick={goForm}>
          Crear Receta
        </button>
      </div>
    </div>
  );
}
