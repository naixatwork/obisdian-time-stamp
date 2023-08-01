import "reflect-metadata";
import {Plugin} from 'obsidian';
import {container} from "tsyringe";
import RibbonService from "./src/core/ribbon-service/ribbon.service";
import MAIN_IDENTIFIERS from "./src/shared/main.identifiers";
import RegisterDashboardService from "./src/dashboard/registerDashboard.service";
import DashboardUnloadService from "./src/core/dashboard-unload-service/dashboardUnload.service";
import GraphPluginService from "./src/core/graph-plugin-service/graphPlugin.service";

export default class MainPlugin extends Plugin {
	async onload() {
		container.register(MAIN_IDENTIFIERS.mainPlugin, {useValue: this});
		container.resolve(RibbonService);
		container.resolve(RegisterDashboardService);
		container.resolve(GraphPluginService);
	}

	onunload() {
		const dashboardUnloadService = container.resolve(DashboardUnloadService);
		dashboardUnloadService.unloadDashboard();
		container.dispose();
	}
}
