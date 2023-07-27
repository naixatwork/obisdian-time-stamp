import {singleton} from "tsyringe";
import {Observable, Subject} from "rxjs";

@singleton()
export default class DashboardShowService {
	readonly #showApp$ = new Subject<null>();

	public notifyShowApp() {
		this.#showApp$.next(null);
	}

	public get showApp$(): Observable<null> {
		return this.#showApp$.asObservable();
	}
}
