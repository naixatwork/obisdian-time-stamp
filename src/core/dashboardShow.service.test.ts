import expect from "expect";
import {container} from "tsyringe";
import DashboardShowService from "./dashboardShow.service";

describe('dashboard', () => {
	let service = container.resolve(DashboardShowService);

	beforeEach(() => {
		service = container.resolve(DashboardShowService);
	});

	test('it should be defined', () => {
		expect(service).toBeDefined();
	});

	test('it should have #showEvent$ as ');
});

