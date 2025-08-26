function SelectPopUp( { characters, clickX, clickY, visible, onClose }) {
    
    return (
        <div className={`popUp ${visible ? 'visible' : 'hidden'}`} style={{left: `${clickX}px`, top: `${clickY}px`}}>
            <ul>
                {characters.map(character => {
                    return (
                        <li key={character.name}>
                            <button onClick={() => onClose(character.name)}>{character.name}</button>
                        </li>
                    )                    
                })}
            </ul>
        </div>
    )
}

export default SelectPopUp