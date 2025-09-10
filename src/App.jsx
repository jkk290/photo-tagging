import { useEffect, useState } from 'react'
import './App.css'
import GameContainer from './components/GameContainer'
import HighScores from './components/HighScores'

function App() {
  const [scores, setScores] = useState([])
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/records')
        const data = await response.json()
        setScores(data)
      } catch (error) {
        console.log('Unable to get scores', error)
      } finally {
        setIsLoading(false)
      }      
    }
    fetchScores()
  }, [])

  const updateScores = async (record) => {
    try {
      await fetch('http://localhost:3000/api/games/end', {
      method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(record)
      })
    } catch (error) {
      console.log('Unable to update game records', error)
    }    
  }

  return (
    <div className='game'>
      <h1 className='title'>Find Waldo and Friends</h1>
      <GameContainer updateScores={updateScores}/>
      <HighScores scores={scores} isLoading={isLoading}/>
    </div>
  )
}

export default App
