import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../shared/main.identifiers";
import MainPlugin from "../../main";
import {DashboardView} from "./dashboard.view";
import DashboardBootstrapService from "../core/dashboard-bootstrap-service/dashboardBootstrap.service";

@singleton()
export default class RegisterDashboardService {

	constructor(
		@inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin,
		@inject(DashboardBootstrapService) private readonly dashboardShowService: DashboardBootstrapService
	) {
		this.mainPlugin.registerView(
			DashboardView.VIEW_TYPE,
			(leaf) => new DashboardView(leaf)
		);

		this.dashboardShowService.bootstrapStatus$.subscribe({
			next: () => {
				this.activateView().then();
			}
		});
	}

	async activateView() {
		this.mainPlugin.app.workspace.detachLeavesOfType(DashboardView.VIEW_TYPE);

		await this.mainPlugin.app.workspace.getLeaf(false).setViewState({
			type: DashboardView.VIEW_TYPE,
			active: true,
		});

		this.mainPlugin.app.workspace.revealLeaf(
			this.mainPlugin.app.workspace.getLeavesOfType(DashboardView.VIEW_TYPE)[0]
		);
	}
}
