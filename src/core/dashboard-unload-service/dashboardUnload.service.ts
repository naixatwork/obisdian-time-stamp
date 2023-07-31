import {singleton} from "tsyringe";
import {Observable, Subject} from "rxjs";

@singleton()
export default class DashboardUnloadService {
	readonly #dashboardUnload$ = new Subject<null>();

	public get dashboardUnload$(): Observable<null> {
		return this.#dashboardUnload$.asObservable();
	}

	public unloadDashboard(): void {
		this.#dashboardUnload$.next(null);
		this.#dashboardUnload$.complete();
	}
}
