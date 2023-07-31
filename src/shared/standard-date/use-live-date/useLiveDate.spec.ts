import useLiveDate from "./useLiveDate";
import {act, renderHook} from "@testing-library/react";

jest.useFakeTimers();

describe("useLiveDate hook", () => {
	it("should return the current date", () => {
		const {result} = renderHook(() => useLiveDate());

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		const currentDate = new Date();
		expect(result.current).toEqual(currentDate);
	});

	it("should update the date every second", () => {
		const {result} = renderHook(() => useLiveDate());

		act(() => {
			jest.advanceTimersByTime(3000);
		});

		const updatedDate = new Date();
		expect(result.current.value.getTime()).toEqual(updatedDate.getTime());
	});
});
