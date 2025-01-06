export const getDate = (date) => {           // Jun 24, 2024
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    console.log(formattedDate);
    return formattedDate;
}

export const getTime = (date) => {           // 12:00 AM
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(date).toLocaleTimeString('en-US', options);
    return formattedTime;
}