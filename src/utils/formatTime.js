function extractTime(timeString) {
  if (!timeString || timeString.length !== 24) {
    return "Error date not found";
  }
  const year = timeString.slice(0, 4);
  const month = timeString.slice(5, 7);
  const day = timeString.slice(8, 10);
  const hour = timeString.slice(11, 13);
  const minute = timeString.slice(14, 16);
  const second = timeString.slice(17, 19);

  return { year, month, day, hour, minute, second };
}

function displayDate(dateObject) {
  if (dateObject === "Error date not found") {
    return "Error date not found";
  }
  const { year, month, day } = dateObject;
  return `${day}/${month}/${year}`;
}

export {extractTime, displayDate };
