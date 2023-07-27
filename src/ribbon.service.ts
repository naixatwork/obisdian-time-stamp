import MainPlugin from "../main";
import {inject, singleton} from "tsyringe";
import MAIN_IDENTIFIERS from "./shared/main.identifiers";
import DashboardShowService from "./core/dashboardShow.service";

@singleton()
export default class RibbonService {
  constructor(
    @inject(MAIN_IDENTIFIERS.mainPlugin) private readonly mainPlugin: MainPlugin,
    @inject(DashboardShowService) private readonly dashboardShowService: DashboardShowService
  ) {
    this.mainPlugin.addRibbonIcon("pie-chart", "Dashboard", () => {
      dashboardShowService.notifyShowApp();
    });
  }
}
