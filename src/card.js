import React from "react";
import backsideCard from "./pic/backside-card.png";

function Card({ card, onClick }) {
  return (
    <div
      className={`memory-card${card.isFlipped ? " flip" : ""}`}
      onClick={onClick}
      style={{ order: card.order }}
      data-testid={card.id}
    >
      <img className="front-face" src={card.image} alt={card.name} />
      <img className="back-face" src={backsideCard} alt="Card Back" />
    </div>
  );
}

export default Card;