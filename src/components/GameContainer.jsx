import { useRef, useState } from "react"

function GameContainer() {
    const [gameMsg, setGameMsg] = useState('')
    const [targetBox, setTargetBox] = useState({ x: 0, y: 0, display: false })
    const waldoImg = useRef(null)

    const handleClick = (e) => {
        const clickX = e.nativeEvent.offsetX
        const clickY = e.nativeEvent.offsetY

        setGameMsg(`Click at (${clickX}, ${clickY})`)
        setTargetBox({ x: clickX, y: clickY, display: true})
    }

    return (
        <>
            <h2>{gameMsg}</h2>
            <div className="photoContainer">
                <img src="../../public/waldoCropped.png" alt="Find Waldo and friends" className="waldo-img" ref={waldoImg} onClick={handleClick}/>
                {targetBox.display ? <div className="target-box" style={{left: `${targetBox.x}px`, top: `${targetBox.y}px`}}></div> : null}
            </div>
        </>
    )

}

export default GameContainer