import { useState } from 'react'
import './App.css'
import GameContainer from './components/GameContainer'
import HighScores from './components/HighScores'

function App() {
  const [scores, setScores] = useState([])

  const updateScores = (record) => {
    setScores(prev => {
      return [...prev, record]
    })
  }

  return (
    <div className='game'>
      <h1 className='title'>Find Waldo and Friends</h1>
      <GameContainer updateScores={updateScores}/>
      <HighScores scores={scores}/>
    </div>
  )
}

export default App
