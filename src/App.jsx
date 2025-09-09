import { useEffect, useState } from 'react'
import './App.css'
import GameContainer from './components/GameContainer'
import HighScores from './components/HighScores'

function App() {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch('http://localhost:3000/api/records')

      const data = await response.json()

      setScores(data)
    }
    fetchScores()
  }, [])

  const updateScores = async (record) => {
    // setScores(prev => {
    //   return [...prev, record]
    // })

    await fetch('http://localhost/api/records', {
      method: 'post',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(record)
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
