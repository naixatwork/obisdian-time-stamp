import {useEffect, useState} from "react";

const useLiveDate = (): Date => {
	const [liveDate, setLiveDate] = useState(new Date());

	useEffect(() => {
		const updateLiveDate = setInterval(() => {
			setLiveDate(new Date());
		}, 1000);

		return () => {
			clearInterval(updateLiveDate);
		};
	}, []);


	return liveDate;
};

export default useLiveDate;
