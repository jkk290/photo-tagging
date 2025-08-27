function formatTime(timer) {
    let minutes = Math.floor(timer / 60)
    let seconds = timer % 60

    return { minutes: minutes, seconds: seconds.toString().padStart(2, '0') }
}

export default formatTime