import {singleton} from "tsyringe";
import {Observable, Subject} from "rxjs";

@singleton()
export default class DashboardBootstrapService {
	readonly #bootstrapStatus$ = new Subject<null>();

	public get bootstrapStatus$(): Observable<null> {
		return this.#bootstrapStatus$.asObservable();
	}

	public launchDashboard() {
		console.log('Dashboard Bootstrapped');
		this.#bootstrapStatus$.next(null);
	}
}
