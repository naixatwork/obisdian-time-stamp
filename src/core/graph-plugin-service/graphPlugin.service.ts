import {container, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import MainPlugin from "../../../main";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {BehaviorSubject, Observable, takeUntil, tap} from "rxjs";
import {GraphGroup, GraphSettings} from "./graphPlugin.types";
import MarkdownFilesService from "../markdown-files-service/markdownFiles.service";
import DashboardUnloadService from "../dashboard-unload-service/dashboardUnload.service";

@singleton()
export default class GraphPluginService {
    #mainPlugin = container.resolve<MainPlugin>(MAIN_IDENTIFIERS.mainPlugin);
    #dashboardUnloadService = container.resolve(DashboardUnloadService);
    #markdownFilesService = container.resolve(MarkdownFilesService);

    #groupedMarkdownFiles$ = new BehaviorSubject<GraphGroup[]>([]);

    constructor() {
        this.#vaultFilesFilteredByGroups();
        this.#groupedMarkdownFiles$.subscribe(console.log);
    }

    get #graphPluginSettings$(): Observable<GraphSettings> {
        // @ts-expect-error
        return fromPromise(this.#mainPlugin.app.internalPlugins.getPluginById("graph")?.loadData());
    }

    async #vaultFilesFilteredByGroups() {
        this.#graphPluginSettings$
            .pipe(
                takeUntil(this.#dashboardUnloadService.dashboardUnload$),
                tap((graphSettings) => {
                    graphSettings.colorGroups.forEach((colorGroup) => {
                        this.#markdownFilesService.getMarkdownFilesByName$(colorGroup.query).subscribe({
                            next: (files) => {
                                this.#groupedMarkdownFiles$.next([...this.#groupedMarkdownFiles$.value, {
                                    group: colorGroup,
                                    associatedFiles: files,
                                    name: colorGroup.query
                                }]);
                            }
                        });
                    });
                })
            ).subscribe();
    }
}
