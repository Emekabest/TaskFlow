

// Formats recorded seconds into a simple mm:ss timer display.
const RecordTimerConverter = (totalSeconds) => {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`.split(".")[0];

    return formatted;
}


export default RecordTimerConverter;