import React, { useState, useEffect } from "react";
import Card from "./card";
import { cardsData } from "./cards";

function Game() {
  let [cardsState, setCardsState] = useState([]);
  const [tries, setTries] = useState(0);
  let [firstCard, setFirstCard] = useState(null);
  let [secondClick, setSecondClick] = useState(false);
  let [wait, setWait] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...cardsData]
      .map((a) => ({ ...a, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((card, index) => ({ ...card, isFlipped: false, id: index + 1 }));

    setCardsState(shuffledCards);
  };

  const resetGame = () => {
    setTries(0);
    shuffleCards();
  };

  const checker = async (card) => {
    if (card.name === firstCard.name) {
      console.log("hellooo");
      card.passed = true;
      firstCard.passed = true;
      changeCardStatusHandler(card);
      changeCardStatusHandler(firstCard);
    } else {
      setWait(true);
      setTimeout(() => {
        changeCardStatusHandler(card);
        changeCardStatusHandler(firstCard);
        setWait(false);
      }, 1500);
    }
  };

  const changeCardStatusHandler = async (clickedCard) => {
    if (!clickedCard.passed) clickedCard.isFlipped = !clickedCard.isFlipped;
    let index = cardsState.findIndex((card) => card.id === clickedCard.id);
    let newState = [...cardsState];
    newState.splice(index, 1, clickedCard);
    await setCardsState(newState);
  };

  const handleClick = async (e, clickedCard) => {
    if (wait || clickedCard.isFlipped) {
      return;
    }
    if (!secondClick) {
      await setFirstCard(clickedCard);
      await setSecondClick(true);
    } else {
      await setSecondClick(false);
      setFirstCard(null);
      setTries(tries + 1);
    }
    changeCardStatusHandler(clickedCard);
    if (firstCard && firstCard.id !== clickedCard.id) {
      checker(clickedCard);
    }
  };

  return (
    <div>
      <section className="memory-game">
        {cardsState.map((card) => (
          <Card key={card.id} card={card} onClick={(e) => handleClick(e, card)} />
        ))}
      </section>
      <p id="tries">Versuche: {tries}</p>
      <button id="new-try-button" onClick={resetGame}>Neuer Versuch</button>
    </div>
  );
}

export default Game;
