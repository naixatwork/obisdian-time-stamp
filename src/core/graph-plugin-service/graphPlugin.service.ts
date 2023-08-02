import {container, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import MainPlugin from "../../../main";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {BehaviorSubject, forkJoin, map, Observable, takeUntil} from "rxjs";
import {GraphGroup, GraphSettings} from "./graphPlugin.types";
import MarkdownFilesService from "../markdown-files-service/markdownFiles.service";
import DashboardUnloadService from "../dashboard-unload-service/dashboardUnload.service";
import * as _ from 'lodash';

@singleton()
export default class GraphPluginService {
	#mainPlugin = container.resolve<MainPlugin>(MAIN_IDENTIFIERS.mainPlugin);
	#dashboardUnloadService = container.resolve(DashboardUnloadService);
	#markdownFilesService = container.resolve(MarkdownFilesService);

	#groupedMarkdownFiles$ = new BehaviorSubject<GraphGroup[]>([]);

	constructor() {
		this.#groupedMarkdownFiles$.subscribe(console.log);
	}

	get #graphPluginSettings$(): Observable<GraphSettings> {
		// @ts-expect-error
		return fromPromise(this.#mainPlugin.app.internalPlugins.getPluginById("graph")?.loadData());
	}

	public filesCategoryByGroups(): Observable<GraphGroup[]> {
		return forkJoin({
			graphColorGroups: this.#graphPluginSettings$
				.pipe(map((graphSettings) => graphSettings.colorGroups)),
			markdownFiles: this.#markdownFilesService.markdownFiles$
		}).pipe(
			takeUntil(this.#dashboardUnloadService.dashboardUnload$),
			map(({graphColorGroups, markdownFiles}) => {
				const mutableMarkdownFiles = [...markdownFiles];
				const filesCategoryByGroup: GraphGroup[] = [];
				graphColorGroups.forEach((colorGroup) => {
					filesCategoryByGroup.push({
						group: colorGroup,
						name: colorGroup.query,
						associatedFiles: _.remove(mutableMarkdownFiles, ({name}) => name.includes(colorGroup.query))
					});
				});

				filesCategoryByGroup.push({
					group: {
						query: 'ungrouped',
						color: {a: 1, rgb: 120120120}
					},
					name: 'ungrouped',
					associatedFiles: [...mutableMarkdownFiles]
				});

				return filesCategoryByGroup;
			})
		);
	}
}
