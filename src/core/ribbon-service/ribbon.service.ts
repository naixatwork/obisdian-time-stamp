import MainPlugin from "../../../main";
import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../../shared/main.identifiers";
import DashboardBootstrapService from "../dashboard-bootstrap-service/dashboardBootstrap.service";

@singleton()
export default class RibbonService {
	constructor(
		@inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin,
		@inject(DashboardBootstrapService) private readonly dashboardShowService: DashboardBootstrapService
	) {
		this.mainPlugin.addRibbonIcon("pie-chart", "Dashboard", () => {
			dashboardShowService.launchDashboard();
		});
	}
}
