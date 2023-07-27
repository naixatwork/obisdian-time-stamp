import Dashboard from "../main";
import {Subject} from "rxjs";
import {inject, singleton} from "tsyringe";

@singleton()
export default class RibbonService {
	private onOpenApp = new Subject()

	constructor(
		@inject('Dashboard') private readonly dashboard: Dashboard
	) {
        console.log('happy', this.dashboard)
		this.onOpenApp.subscribe({
			next: () => {
				console.log('lol111')
			}
		})
		this.perform()
	}

	private perform() {
		this.dashboard.addRibbonIcon("pie-chart", "Dashboard", () => {
			this.onOpenApp.next(1);
		})
	}
}
