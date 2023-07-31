import {container, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import MainPlugin from "../../../main";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {delay, expand, Observable, of, tap} from "rxjs";
import {GraphSettings} from "./graphPlugin.types";

@singleton()
export default class GraphPluginService {
    #mainPlugin = container.resolve<MainPlugin>(MAIN_IDENTIFIERS.mainPlugin);

    constructor() {
        this.vaultFilesFilteredByGroups;
    }

    get vaultFilesFilteredByGroups() {
        // this.#graphPluginSettings$.pipe();
        of(this.#mainPlugin.app.vault.getMarkdownFiles())
            .pipe(
                delay(3000),
                expand((lol) => of(lol)),
                tap((lol) => {
                    console.log(lol);
                })
            )
            .subscribe(console.log);
        return '';
    }

    get #graphPluginSettings$(): Observable<GraphSettings> {
        // @ts-expect-error
        return fromPromise(this.#mainPlugin.app.internalPlugins.getPluginById("graph")?.loadData());
    }
}
