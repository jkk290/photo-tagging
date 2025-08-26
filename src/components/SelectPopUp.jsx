function SelectPopUp( { clickX, clickY, visible, onClose }) {
    const characters = [
        'Waldo',
        'Woof',
        'Wenda',
        'Wizard',
        'Odlaw'
    ]

    return (
        <div className={`popUp ${visible ? 'visible' : 'hidden'}`} style={{left: `${clickX}px`, top: `${clickY}px`}}>
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