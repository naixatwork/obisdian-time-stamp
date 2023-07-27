import "reflect-metadata";
import {Plugin} from 'obsidian';
import {container} from "tsyringe";
import RibbonService from "./src/ribbon.service";
import MAIN_IDENTIFIERS from "./src/shared/main.identifiers";
import RegisterDashboardService from "./src/dashboard/registerDashboard.service";

export default class MainPlugin extends Plugin {
	async onload() {
		container.register<MainPlugin>(
			MAIN_IDENTIFIERS.mainPlugin, {useValue: this}
		);
		container.resolve(RibbonService)
		container.resolve(RegisterDashboardService)
	}
	onunload() {
		container.dispose()
	}
}
