function CharacterList({ characters }) {
    
    return (
        <div className='characterList'>
            <ul>
                {characters.map((character) => {
                    <li 
                        key={character.name} 
                        className={character.found ? 'characterFound' : null}
                    >
                        {character.name}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CharacterList