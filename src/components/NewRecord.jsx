import { useState } from "react"

function NewRecord({ saveRecord }) {
    const [playerNameField, setPlayerNameField] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        saveRecord(playerNameField)
    }

    return (
        <form onSubmit={handleSubmit} className="newRecordForm">
            <label htmlFor="playerName">Enter a name</label>
            <br />
            <input 
            type="text" 
            name="playerName"
            id="playerName" 
            value={playerNameField}
            onChange={(e) => setPlayerNameField(e.target.value)}
            />
            <br />
            <button type="submit">Add</button>
        </form>
    )
}

export default NewRecord