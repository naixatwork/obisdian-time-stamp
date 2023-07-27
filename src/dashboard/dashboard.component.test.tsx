import * as React from "react";
import {render, screen} from "@testing-library/react";
import {DashboardComponent} from "./dashboard.component";
describe('dashboardComponent', () => {
    beforeEach(() => {
       render(<DashboardComponent />);
       screen.debug();
    })

    test('it should render', () => {
        const component = screen.getByTestId('app');
        expect(component).toHaveTextContent('0');
    })
});
