import "reflect-metadata";
import {Plugin} from 'obsidian';
import {container} from "tsyringe";
import RibbonService from "./src/ribbon.service";

export default class Dashboard extends Plugin {
	async onload() {
		container.register<Dashboard>('Dashboard', {useValue: this});
		container.resolve(RibbonService)
	}
	onunload() {
		container.dispose()
	}
}
