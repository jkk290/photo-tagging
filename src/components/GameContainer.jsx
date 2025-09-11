import { useEffect, useRef, useState } from "react"
import { MapPinCheckInside } from 'lucide-react'
import SelectPopUp from "./SelectPopUp"
import Timer from "./Timer"
import NewRecord from "./NewRecord"
import CharacterList from './CharacterList'

function GameContainer({ updateScores }) {
    const [gameStart, setGameStart] = useState(false)
    const [gameId, setGameId] = useState(null)
    const [timer, setTimer] = useState(0)
    const [targetBox, setTargetBox] = useState({ x: 0, y: 0, display: false })
    const [popUp, setPopUp] = useState({ x: 0, y: 0, display: false})
    const [numFound, setNumFound] = useState(0)
    const [recordFormOpen, setRecordFormOpen] = useState(false)
    const [characters, setCharacters] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const waldoImg = useRef(null)
    const recordForm = useRef(null)

    useEffect(() => {
        const dialog = recordForm.current
        const handleClose = () => {
            setRecordFormOpen(false)
        }
        if (recordFormOpen) {
            dialog?.showModal()
            dialog?.addEventListener('close', handleClose)
        } else {
            dialog?.close()
        }
        return () => {
            dialog?.removeEventListener('close', handleClose)
        }
    }, [recordFormOpen])

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:3000/api/characters')
                if (!response.ok) {
                    console.log('Unable to get characters')
                }
                const data = await response.json()
                setCharacters(data)
            } catch (error) {
                console.log('Unable to get characters', error)
            } finally {
                setIsLoading(false)
            }            
        }
        fetchCharacters()
    }, [])

    const handleClick = (e) => {
        const clickX = e.nativeEvent.offsetX
        const clickY = e.nativeEvent.offsetY
        console.log(`Click at ${clickX}, ${clickY}`)
        setTargetBox({ x: clickX, y: clickY, display: true})
        setPopUp({ x: clickX, y: clickY, display: true })
    }

    const handleStart = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/games/start', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    gameStart: true
                })
            })      

            if (!response.ok) {
                return console.log('Unable to start game')
            }
            const data = await response.json()
            setGameStart(true)
            setGameId(data.gameId)
            setNumFound(0)
            const charactersNotFound = characters.map((character) => {
                return { ...character, found: false }
            })
            setCharacters(charactersNotFound)
        } catch (error) {
            console.log('Unable to start game', error)
        }
       
    }

    const saveRecord = (playerName) => {
        const newRecord = {
            gameId: gameId,
            gameStart: false,
            playerName: playerName, 
            endTime: timer 
        }
        updateScores(newRecord)
        setRecordFormOpen(false)
    }

    const handleClose = async (characterName) => {
        const characterInfo = characters.find((character) => {
            return (character.name === characterName)
        })
        if (characterInfo.found) {
            return console.log('Character already found')
        }

        try {
            const response = await fetch('http://localhost:3000/api/characters/verify', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: characterName,
                    posX: targetBox.x,
                    posY: targetBox.y
                })
            })
            const result = await response.json()
            if (result && result.found) {
                setCharacters(prev => {
                    const foundIndex = prev.findIndex((character) => character.name === characterName)
                    const updatedCharacter = {...prev[foundIndex], found: true}
                    const newCharactersArray = [...prev]
                    newCharactersArray[foundIndex] = updatedCharacter
                    return newCharactersArray
                })
                const newNumFound = numFound + 1
                setNumFound(newNumFound)
                const maxCharacters = characters.length
                if (newNumFound === maxCharacters) {
                    setGameStart(false)
                    setRecordFormOpen(true)
                }
            }
            setTargetBox({ x: 0, y: 0, display: false })
            setPopUp((prev) => {
                return {...prev, display: false}
            })
        } catch (error) {
            console.log('Unable to verify character', error)
        }               
    }

    return (
        <>
            <Timer 
                gameStart={gameStart} 
                timer={timer} 
                setTimer={setTimer}
            />

            <CharacterList 
                characters={characters}
                isLoading={isLoading}
            />
            
            <div className="photoContainer">
                {characters.map(character => {
                        if (character.found) {
                            return (
                                <MapPinCheckInside 
                                    key={character.name}
                                    color="blue" 
                                    size={24} 
                                    style={{left: `${character.posX}px`, top: `${character.posY}px`}}
                                />
                            )
                        }                      
                })}

                <img 
                    src="/waldoCropped.png" 
                    alt="Find Waldo and friends" 
                    className={`waldo-img ${!gameStart ? 'blur' : null}`} 
                    ref={waldoImg} 
                    onClick={handleClick}
                />
                { !gameStart ? <button onClick={handleStart} className="start-btn">Start</button> : null }

                { targetBox.display ? <div className="target-box" style={{left: `${targetBox.x}px`, top: `${targetBox.y}px`}}></div> : null }

                <SelectPopUp 
                    characters={characters} 
                    popUp={popUp}
                    onClose={handleClose}
                />

                {recordFormOpen ? <dialog ref={recordForm}><NewRecord saveRecord={saveRecord} /></dialog> : null}
            </div>
        </>
    )
}

export default GameContainer