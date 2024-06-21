function extractTime(timeString) {
  if (!timeString || timeString.length !== 24) {
    return "Date not found";
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
  if (dateObject === "Date not found") {
    return "Date not found";
  }
  const { year, month, day } = dateObject;
  return `${day}/${month}/${year}`;
}

const secondsToTimeString = (seconds) => {
  let secondsRemaining = seconds;

  const timeIntervals = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  const timeBreakdowns = {};
  timeIntervals.forEach((interval) => {
    const unit = interval[0];
    const unitNumOfSeconds = interval[1];
    if (Math.floor(secondsRemaining / unitNumOfSeconds) > 0) {
      const timeToReturn = Math.floor(secondsRemaining / unitNumOfSeconds);
      secondsRemaining -= timeToReturn * unitNumOfSeconds;
      timeBreakdowns[unit] = timeToReturn;
    }
  });
  return timeBreakdowns;
};

function displayTimeSince(timeString, endTime = Date.now()) {
  if (!timeString || timeString.length !== 24) {
    return "Date not found";
  }

  const startMilliSeconds = new Date(timeString).valueOf();
  const endSMilliseconds = new Date(endTime).valueOf();
  const timeDifferennce = Math.abs(
    (endSMilliseconds - startMilliSeconds) / 1000
  );
  const { year, month, day, hour, minute, second } =
    secondsToTimeString(timeDifferennce);

  function returnString(string, number) {
    const flooredNumber = Math.floor(number);
    const pluralCheckedString = flooredNumber === 1 ? string : string + "s";
    return `${flooredNumber} ${pluralCheckedString} ago`;
  }

  if (year >= 1) {
    return returnString("year", year);
  } else if (month >= 1) {
    return returnString("month", month);
  } else if (day >= 1) {
    return returnString("day", day);
  } else if (hour >= 1) {
    return returnString("hour", hour);
  } else if (minute >= 1) {
    return returnString("minute", minute);
  } else {
    return "Just now";
  }
}
export {
  extractTime,
  displayDate,
  displayTimeSince,
  secondsToTimeString,
};
