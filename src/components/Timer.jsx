import { useEffect, useState } from "react"

function Timer({ gameStart }) {
    const [timer, setTimer] = useState(0)

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
    }, [gameStart])

    const formattedTimer = () => {
        let minutes = Math.floor(timer / 60)
        let seconds = timer % 60

        return { minutes: minutes, seconds: seconds.toString().padStart(2, '0') }
    }

    const formatted = formattedTimer()
    return (
        <div>
            <h2>{formatted.minutes}:{formatted.seconds} </h2>
        </div>
    )

}

export default Timer