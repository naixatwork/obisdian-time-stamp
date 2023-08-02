import {container, singleton} from "tsyringe";
import {delayWhen, map, of, retryWhen, takeUntil, tap, timer} from "rxjs";
import MainPlugin from "../../../main";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import DashboardUnloadService from "../dashboard-unload-service/dashboardUnload.service";

@singleton()
export default class MarkdownFilesService {
	#mainPlugin = container.resolve<MainPlugin>(MAIN_IDENTIFIERS.mainPlugin);
	#dashboardUnloadService = container.resolve(DashboardUnloadService);

	public get markdownFiles$() {
		return of(this.#mainPlugin.app.vault.getMarkdownFiles())
			.pipe(
				takeUntil(this.#dashboardUnloadService.dashboardUnload$),
				map(() => {
					return this.#mainPlugin.app.vault.getMarkdownFiles();
				}),
				map((values) => {
					console.log(values);
					if (values.length === 0) {
						throw values;
					}
					return values;
				}),
				retryWhen((errors) => errors.pipe(
					tap(val => console.log(`there was no markdown files`)),
					delayWhen(() => timer(300))
				)),
			);
	}
}
