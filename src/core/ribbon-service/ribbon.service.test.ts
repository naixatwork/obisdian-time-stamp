import RibbonService from "./ribbon.service";
import {container} from "tsyringe";

describe(RibbonService.name, () => {
	let service = container.resolve(RibbonService);

	beforeEach(() => {
		service = container.resolve(RibbonService);
	});

	test('it should be defined', () => {
		expect(service).toBeDefined();
		expect(service).toBeInstanceOf(RibbonService);
	});
});
