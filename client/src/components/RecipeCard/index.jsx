import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./styles.css";

export default function RecipeCard({ title, image, id }) {
  const history = useHistory();
  function goDetails() {
    history.push(`/details/${id}`);
  }
  return (
    <div className="containerCard" onClick={goDetails}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
}
