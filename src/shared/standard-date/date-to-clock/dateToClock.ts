type DateToClock = (date: Date) => string

const dateToClock: DateToClock = (date) => {
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
};

export default dateToClock;
