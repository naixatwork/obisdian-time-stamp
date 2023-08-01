import {container, singleton} from "tsyringe";
import {BehaviorSubject, delayWhen, map, Observable, of, retryWhen, takeUntil, tap, timer} from "rxjs";
import {TFile} from "obsidian";
import MainPlugin from "../../../main";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import DashboardUnloadService from "../dashboard-unload-service/dashboardUnload.service";

@singleton()
export default class MarkdownFilesService {
	#mainPlugin = container.resolve<MainPlugin>(MAIN_IDENTIFIERS.mainPlugin);
	#dashboardUnloadService = container.resolve(DashboardUnloadService);

	#markdownFiles$ = new BehaviorSubject<TFile[]>([]);

	constructor() {
		this.#initializeMarkdownFiles();
	}

	public get markdownFiles$(): Observable<TFile[]> {
		return this.#markdownFiles$.asObservable();
	}

	public getMarkdownFilesByName$(name: string): Observable<TFile[]> {
		return this.#markdownFiles$.asObservable().pipe(
			map((markdownFiles) => {
				return markdownFiles.filter((file) => file.name.contains(name));
			})
		);
	}

	#initializeMarkdownFiles() {
		of(this.#mainPlugin.app.vault.getMarkdownFiles())
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
			).subscribe({
			next: (files) => {
				this.#markdownFiles$.next(files);
			}
		});
	}
}
