import { useEffect } from "react"
import formatTime from "../utils/formatTime"

function Timer({ gameStart, timer, setTimer }) {

    useEffect(() => {
        let intervalId
        
        if (gameStart) {
            setTimer(0)
            intervalId = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        
        return () => {
            clearInterval(intervalId)
        }
    }, [gameStart, setTimer])

    const formatted = formatTime(timer)

    return (
        <div className='timer'>
            <h2>{formatted.minutes}:{formatted.seconds} </h2>
        </div>
    )

}

export default Timer