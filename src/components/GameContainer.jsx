import { useEffect, useRef, useState } from "react"
import SelectPopUp from "./SelectPopUp"
import Timer from "./Timer"
import NewRecord from "./NewRecord"
import CharacterList from './CharacterList'

function GameContainer({ updateScores }) {
    const [gameStart, setGameStart] = useState(false)
    const [timer, setTimer] = useState(0)
    const [targetBox, setTargetBox] = useState({ x: 0, y: 0, display: false })
    const [popUp, setPopUp] = useState({ x: 0, y: 0, display: false})
    const [numFound, setNumFound] = useState(0)
    const [recordFormOpen, setRecordFormOpen] = useState(false)
    const [characters, setCharacters] = useState([
        {
            name: 'Waldo',
            posX: 445,
            posY: 245,
            found: false
        },
        {
            name: 'Woof',
            posX: 611,
            posY: 489,
            found: false
        },
        {
            name: 'Wenda',
            posX: 178,
            posY: 220,
            found: false
        },
        {
            name: 'Wizard',
            posX: 858,
            posY: 702,
            found: false
        },
        {
            name: 'Odlaw',
            posX: 195,
            posY: 478,
            found: false
        }
    ])
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

    const handleClick = (e) => {
        const clickX = e.nativeEvent.offsetX
        const clickY = e.nativeEvent.offsetY

        setTargetBox({ x: clickX, y: clickY, display: true})
        setPopUp({ x: clickX, y: clickY, display: true })
    }

    const handleStart = () => {
        setGameStart(true)
        setNumFound(0)
        const reset = characters.map((character) => {
            return { ...character, found: false }
        })
        setCharacters(reset)
    }

    const saveRecord = (playerName) => {
        const record = {playerName, timer }
        updateScores(record)
        setRecordFormOpen(false)
    }

    const handleClose = (characterName) => {

        const minX = targetBox.x - 35
        const maxX = targetBox.x + 35
        const minY = targetBox.y - 35
        const maxY = targetBox.y + 35

        const result = characters.find((character) => {
            return (character.posX >= minX && character.posX <= maxX) && (character.posY >= minY && character.posY <= maxY)
        })

        if (result && result.name === characterName && result.found === false) {
            setCharacters(prev => {
                const foundIndex = prev.findIndex((character) => character.name === characterName)
                const updatedCharacter = {...prev[foundIndex], found: true}
                const newCharactersArray = [...prev]
                newCharactersArray[foundIndex] = updatedCharacter
                return newCharactersArray
            })

            const newNumFound = numFound + 1
            setNumFound(newNumFound)

            if (newNumFound === 5) {
                setGameStart(false)
                setRecordFormOpen(true)
            }
        }       

        setTargetBox({ x: 0, y: 0, display: false })
        setPopUp((prev) => {
            return {...prev, display: false}
        })
       
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
            />
            
            <div className="photoContainer">
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