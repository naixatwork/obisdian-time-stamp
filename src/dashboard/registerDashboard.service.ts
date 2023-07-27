import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "../shared/main.identifiers";
import MainPlugin from "../../main";
import {DashboardView, VIEW_TYPE_EXAMPLE} from "./dashboard.view";
import DashboardShowService from "../core/dashboardShow.service";

@singleton()
export default class RegisterDashboardService {

    constructor(
        @inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin,
        @inject(DashboardShowService) private readonly dashboardShowService: DashboardShowService
    ) {
        this.mainPlugin.registerView(
            VIEW_TYPE_EXAMPLE,
            (leaf) => new DashboardView(leaf)
        )

        dashboardShowService.showEvent$.subscribe({
            next: () => {
                this.activateView().then()
            }
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
