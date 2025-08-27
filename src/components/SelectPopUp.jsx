function SelectPopUp( { characters, popUp, onClose }) {
    
    return (
        <div className={`popUp ${popUp.display ? 'visible' : 'hidden'}`} style={{left: `${popUp.x}px`, top: `${popUp.y}px`}}>
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