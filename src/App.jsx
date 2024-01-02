import Die from "./components/Die"
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import ConfettiExplosion from 'react-confetti-explosion'

function App() {

  const [buttonText, setButtonText] = useState('Roll')
  
  const generateDiceValue = () => Math.ceil(Math.random() * 6)
  
  const diceValuesArray = () => {
    let array = []
    for(let i=0; i<10; i++){
      array.push(
        {
          id: nanoid(),
          value: generateDiceValue(),
          isHeld: false
        })
      }
      return array
    }
    
  const [diceValues, setDiceValues] = useState(diceValuesArray())

  useEffect(() => {
    setDiceValues(diceValuesArray())
  }, [])
  
  const tenzies = diceValues.every(x => x.isHeld && x.value === diceValues[0].value)

  const toggleIsheld = id => {
    setDiceValues(prevState => 
      prevState.map(x => x.id === id 
        ? { ...x, isHeld: !x.isHeld } 
        : x
      )
    )
  }

  const handleButtonClick = () => {
    if(buttonText === 'Roll'){
      setDiceValues(prevState => prevState.map(x => 
        x.isHeld ? x : { ...x, value: generateDiceValue() }
        ))
    }else {
      setDiceValues(diceValuesArray())
      setButtonText('Roll')
    }
  }

  const dieElements = diceValues.map(x =>
    <Die 
      key={x.id} 
      content={x.value} 
      toggleIsheld={toggleIsheld}
      isHeld={x.isHeld}
      id={x.id} />
  )

  const afterConfettiExplosion = () => {
    setButtonText('Reset Game')
  }

  return (
    <main>
      <section className="container">
        <h1>Tenzies</h1>
        {tenzies && 
          <div className="confetti">
              <ConfettiExplosion onComplete={afterConfettiExplosion} />
          </div>
        }
        <p>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <section className="container--die ">
          {dieElements}
        </section>
        <button onClick={handleButtonClick}>{buttonText}</button>
      </section>
    </main>
  )
}

export default App