import {autoInjectable, injectable, singleton} from "tsyringe";
import {Subject} from "rxjs";
import instance from "tsyringe/dist/typings/dependency-container";

@singleton()
export default class DashboardShowService {
    public readonly showEvent$ = new Subject<null>()
}
