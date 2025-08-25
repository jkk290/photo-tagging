function SelectPopUp( { clickX, clickY, onClose }) {
    const characters = [
        'Waldo',
        'Woof',
        'Wenda',
        'Wizard',
        'Odlaw'
    ]

    return (
        <div className="popUp" style={{left: `${clickX}px`, top: `${clickY}px`}}>
            <ul>
                {characters.map(character => {
                    return (
                        <li key={character}>
                            <button onClick={onClose}>{character}</button>
                        </li>
                    )                    
                })}
            </ul>
        </div>
    )
}

export default SelectPopUp