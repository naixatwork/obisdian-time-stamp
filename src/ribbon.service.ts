import MainPlugin from "../main";
import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "./shared/main.identifiers";
import {VIEW_TYPE_EXAMPLE} from "./view";

@singleton()
export default class RibbonService {
	constructor(
		@inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin
	) {
		this.mainPlugin.addRibbonIcon("pie-chart", "Dashboard", () => {
			this.activateView().then(console.log)
		})
	}

	async activateView() {
		this.mainPlugin.app.workspace.detachLeavesOfType(VIEW_TYPE_EXAMPLE);

		await this.mainPlugin.app.workspace.getLeaf(false).setViewState({
			type: VIEW_TYPE_EXAMPLE,
			active: true,
		});

		this.mainPlugin.app.workspace.revealLeaf(
			this.mainPlugin.app.workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE)[0]
		);
	}
}
