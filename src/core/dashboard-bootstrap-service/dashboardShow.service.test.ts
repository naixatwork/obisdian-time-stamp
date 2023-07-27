import expect from "expect";
import {container} from "tsyringe";
import DashboardBootstrapService from "./dashboardBootstrap.service";

describe(DashboardBootstrapService.name, () => {
	let service = container.resolve(DashboardBootstrapService);

	beforeEach(() => {
		service = container.resolve(DashboardBootstrapService);
	});

	test('it should notify and emit values through showApp$', (done) => {
		service.bootstrapStatus$.subscribe((value) => {
			expect(value).toBe(null);
			done();
		});

		service.launchDashboard();
	});
});
