import dateToClock from "./dateToClock";

describe("dateToClock function", () => {
	it("should convert date to clock format (hh:mm:ss)", () => {
		const date = new Date("2023-07-28T12:34:56");
		const result = dateToClock(date);
		expect(result).toBe("12:34:56");
	});

	it("should pad single-digit hours, minutes, and seconds with leading zero", () => {
		const date = new Date("2023-07-28T05:06:07");
		const result = dateToClock(date);
		expect(result).toBe("05:06:07");
	});
});

