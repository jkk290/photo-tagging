import formatTime from "../utils/formatTime"

function HighScores({ scores, isLoading }) {

    const sortedScores = scores.sort((a, b) => a.timer - b.timer)
    console.log(sortedScores)

    const formattedScores = sortedScores.map((score) => {
        const formatted = formatTime(score.timer)
        return {
            playerName: score.playerName,
            minutes: formatted.minutes,
            seconds: formatted.seconds
        }
    })

    if (isLoading) {
        return <p className="loading-msg">Loading...</p>
    }
    
    return (
        <table className="scoresTable">
            <thead>
                <tr>
                <th>Player Name</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {formattedScores.map((score) => (
                <tr key={score.playerName}>
                    <td>{score.playerName}</td>
                    <td>{score.minutes}m {score.seconds}s</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default HighScores