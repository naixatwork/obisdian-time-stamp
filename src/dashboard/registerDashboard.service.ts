import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../shared/main.identifiers";
import MainPlugin from "../../main";
import {DashboardView} from "./dashboard.view";
import DashboardShowService from "../core/dashboardShow.service";

@singleton()
export default class RegisterDashboardService {

    constructor(
        @inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin,
        @inject(DashboardShowService) private readonly dashboardShowService: DashboardShowService
    ) {
        this.mainPlugin.registerView(
            DashboardView.VIEW_TYPE,
            (leaf) => new DashboardView(leaf)
        )

        dashboardShowService.showEvent$.subscribe({
            next: () => {
                this.activateView().then()
            }
        })
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
