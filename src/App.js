import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/gift.png", matched: false},
  { "src": "/img/reindeer.png", matched: false},
  { "src": "/img/ornaments-snow.png", matched: false},
  { "src": "/img/wreaths.png", matched: false},
  { "src": "/img/santaclaus.png", matched: false},
  { "src": "/img/bell.png", matched: false},
  { "src": "/img/christmas-presents.png", matched: false},
  { "src": "/img/gingerbread.png", matched: false},
  { "src": "/img/ornament.png", matched: false},
  { "src": "/img/holly.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id : Math.random()}))

      
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
    }

    // handle a choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 Selected Cards
    useEffect(() => {
      if(choiceOne && choiceTwo){
        setDisabled(true)

        if(choiceOne.src === choiceTwo.src){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src){
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn()
        } else {
          setTimeout(() => resetTurn(), 1000)
        }
      }
    }, [choiceOne, choiceTwo])

    // reset choices and increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurn => prevTurn + 1)
      setDisabled(false)
    }

    useEffect(() => {
      shuffleCards()
    }, [])

  return (
    <div className="App">
      <h1>Memory Game Christmas Elements</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
