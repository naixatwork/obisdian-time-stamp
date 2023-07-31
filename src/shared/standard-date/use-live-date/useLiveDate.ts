import {interval, takeUntil, tap} from "rxjs";
import {useSignal} from "@preact/signals-react";
import {container} from "tsyringe";
import DashboardUnloadService from "../../../core/dashboard-unload-service/dashboardUnload.service";
import {useEffect} from "react";

const useLiveDate = () => {
	const dashboardUnloadService = container.resolve(DashboardUnloadService);

	const liveDate = useSignal(new Date());

	useEffect(() => {
		const liveDateSubscription = interval(1000)
			.pipe(
				takeUntil(dashboardUnloadService.dashboardUnload$),
				tap(() => {
					liveDate.value = new Date();
					console.log('called');
				})
			).subscribe();

		return () => {
			liveDateSubscription.unsubscribe();
		};
	}, []);
	return liveDate;
};

export default useLiveDate;
