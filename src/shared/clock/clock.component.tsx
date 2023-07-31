import React from "react";
import dateToClock from "../standard-date/date-to-clock/dateToClock";
import useLiveDate from "../standard-date/use-live-date/useLiveDate";

const ClockComponent = () => {
	const liveDate = useLiveDate();
	return (
		<div className="
			tw-flex
			tw-rounded-lg
			tw-items-center
			tw-justify-center
			tw-p-5">
			<h1 className="tw-m-0 tw-font-bold tw-tracking-widest tw-h-fit">{dateToClock(liveDate.value)}</h1>
		</div>
	);
};

export default ClockComponent;
