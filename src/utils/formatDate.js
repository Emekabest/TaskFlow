

// Converts a date string into a readable, human-friendly label.
const FormatDate = (dateString)=>{

    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    }).format(date);
}


export default FormatDate;