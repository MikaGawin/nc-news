const { extractTime, displayDate } = require("../formatTime");

describe("extractTime", () => {
  test("If passed an invalid string will return Error date not found", () => {
    expect(extractTime("2020-11-15T13:25:00.000")).toBe("Error date not found");
    expect(extractTime()).toBe("Error date not found");
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
    expect(displayDate("Error date not found")).toBe("Error date not found");
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
