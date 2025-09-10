function CharacterList({ characters, isLoading }) {

    const characterList = characters.map(character => {
        return {...character, imgSrc: `/${character.name}.png`}
    })

    if (isLoading) {
        return <p className="loading-msg">Loading...</p>
    }
    
    return (
        <div className='characterList'>
            <ul>
                {characterList.map(character => {
                    return (
                        <li 
                            key={character.name} 
                            className={character.found ? 'characterFound' : null}
                        >
                            <img src={`${character.imgSrc}`} alt={`${character.name}`} />
                            { character.name === 'Woof' ? <p>Woof (Just his tail)</p> : <p>{character.name}</p> }                            
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CharacterList