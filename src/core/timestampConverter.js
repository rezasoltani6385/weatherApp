const timeStammConverter = (timestamp, timezone) => {
  const offset = new Date().getTimezoneOffset() * 60 * 1000

    // Create a Date object from the Unix timestamp
    const timeDate = new Date((timestamp) * 1000 + offset + (timezone * 1000))


    // Define the timezone you want to display (e.g., 'en-US' for U.S. time format)
    const timeZone = 'en-US';

    // Format the date using the desired timezone
    const formattedSunriseTime = timeDate.toLocaleString(timeZone, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return formattedSunriseTime
}

export default timeStammConverter

