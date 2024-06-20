const {
  extractTime,
  displayDate,
  displayTimeSince,
  secondsToTimeString,
} = require("../formatTime");

describe("extractTime", () => {
  test("If passed an invalid string will return date not found", () => {
    expect(extractTime("2020-11-15T13:25:00.000")).toBe("Date not found");
    expect(extractTime()).toBe("Date not found");
  });
  test("Will return an array containing the day, month, year, hour, minutes and seconds", () => {
    expect(extractTime("2020-11-15T13:25:00.000Z")).toEqual({
      day: "15",
      month: "11",
      year: "2020",
      hour: "13",
      minute: "25",
      second: "00",
    });
  });
});

describe("displayDate", () => {
  test("If passed Error date not found will return Error date not found", () => {
    expect(displayDate("Date not found")).toBe("Date not found");
  });
  test("Will return the date in form dd/mm/yyyy", () => {
    const date = {
      day: "15",
      month: "11",
      year: "2020",
      hour: "13",
      minute: "25",
      second: "00",
    };
    expect(displayDate(date)).toBe("15/11/2020");
  });
  test("should not mutate date", () => {
    const date = {
      day: "15",
      month: "11",
      year: "2020",
      hour: "13",
      minute: "25",
      second: "00",
    };
    const dateCopy = {
      day: "15",
      month: "11",
      year: "2020",
      hour: "13",
      minute: "25",
      second: "00",
    };
    displayDate(date);
    expect(date).toEqual(dateCopy);
  });
});

describe("secondsToTimeString()", () => {
  it("returns correct number of seconds", () => {
    expect(secondsToTimeString(2)).toEqual({ second: 2 });
  });
  it("when passed an exact number of minutes returns only minutes", () => {
    expect(secondsToTimeString(60)).toEqual({ minute: 1 });
  });
  it("when passed an exact number of hours returns only hours", () => {
    expect(secondsToTimeString(3600)).toEqual({ hour: 1 });
  });
  it("when passed an exact number of days returns only days", () => {
    expect(secondsToTimeString(86400)).toEqual({ day: 1 });
  });
  it("when passed an exact number of months returns only months", () => {
    expect(secondsToTimeString(2592000)).toEqual({ month: 1 });
  });
  it("when passed an exact number of years returns only years", () => {
    expect(secondsToTimeString(31536000)).toEqual({ year: 1 });
  });
  it("correctly concatenates days years and minutes and seconds togethor where relevant", () => {
    expect(secondsToTimeString(31626061)).toEqual({
      year: 1,
      day: 1,
      hour: 1,
      minute: 1,
      second: 1,
    });
    expect(secondsToTimeString(127702942)).toEqual({
      year: 4,
      day: 18,
      hour: 1,
      minute: 2,
      second: 22,
    });
  });
});

describe("displayTimeSince", () => {
  test("If passed an invalid string will return date not found", () => {
    expect(displayTimeSince("2020-11-15T13:25:00.000")).toBe("Date not found");
    expect(displayTimeSince()).toBe("Date not found");
  });
  test("Will return years if it is the highest", () => {
    const endTime = "2018-11-15T13:25:00.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "2 years ago"
    );
  });
  test("Will return months if it is the highest", () => {
    const endTime = "2020-08-15T13:25:00.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "3 months ago"
    );
  });
  test("Will return days if it is the highest", () => {
    const endTime = "2020-11-12T13:25:00.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "3 days ago"
    );
  });
  test("Will return minutes if it is the highest", () => {
    const endTime = "2020-11-15T13:21:00.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "4 minutes ago"
    );
  });
  test("Will return just now if seconds is the highest", () => {
    const endTime = "2020-11-15T13:24:30.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "Just now"
    );
  });
  test("Will recognise if the number is singluar", () => {
    const endTime = "2019-11-15T13:25:00.000Z";
    expect(displayTimeSince("2020-11-15T13:25:00.000Z", endTime)).toBe(
      "1 year ago"
    );
  });
});
