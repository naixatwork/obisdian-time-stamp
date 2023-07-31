import "reflect-metadata";
import {Plugin} from 'obsidian';
import {container} from "tsyringe";
import RibbonService from "./src/core/ribbon-service/ribbon.service";
import MAIN_IDENTIFIERS from "./src/shared/main.identifiers";
import RegisterDashboardService from "./src/dashboard/registerDashboard.service";
import DashboardUnloadService from "./src/core/dashboard-unload-service/dashboardUnload.service";

export default class MainPlugin extends Plugin {
	async onload() {
		container.register<MainPlugin>(
			MAIN_IDENTIFIERS.mainPlugin, {useValue: this}
		);
		container.resolve(RibbonService);
		container.resolve(RegisterDashboardService);

		// @ts-expect-error
		const graphSettings: object | null | undefined = await this.app.internalPlugins.getPluginById("graph")?.loadData();
		console.log(graphSettings);
		// or graph.json
	}

	onunload() {
		const dashboardUnloadService = container.resolve(DashboardUnloadService);
		dashboardUnloadService.unloadDashboard();
		container.dispose();
	}
}
