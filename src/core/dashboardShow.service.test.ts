import expect from "expect";
import {container} from "tsyringe";
import DashboardShowService from "./dashboardShow.service";

describe('DashboardShowService', () => {
	let service = container.resolve(DashboardShowService);

	beforeEach(() => {
		service = container.resolve(DashboardShowService);
	});

	test('it should notify and emit values through showApp$', (done) => {
		service.showApp$.subscribe((value) => {
			expect(value).toBe(null);
			done();
		});

		service.notifyShowApp();
	});
});
