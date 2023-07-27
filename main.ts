import "reflect-metadata";
import {Plugin} from 'obsidian';
import {container} from "tsyringe";
import RibbonService from "./src/ribbon.service";
import MAIN_IDENTIFIERS from "./src/shared/main.identifiers";
import {ExampleView, VIEW_TYPE_EXAMPLE} from "./src/view";

export default class MainPlugin extends Plugin {
	async onload() {
		container.register<MainPlugin>(
			MAIN_IDENTIFIERS.mainPlugin, {useValue: this}
		);
		container.resolve(RibbonService)

		this.registerView(
			VIEW_TYPE_EXAMPLE,
			(leaf) => new ExampleView(leaf)
		)
	}
	onunload() {
		container.dispose()
	}
}
