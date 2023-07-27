import {IconName, ItemView, WorkspaceLeaf} from "obsidian";
import {createRoot} from "react-dom/client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {DashboardComponent} from "./dashboard.component";

export const VIEW_TYPE_EXAMPLE = "dashboard-view";

export class DashboardView extends ItemView {
    root = createRoot(this.containerEl.children[1]);
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_EXAMPLE;
    }

    getIcon(): IconName {
        return 'pie-chart';
    }

    getDisplayText() {
        return "Dashboard";
    }

    async onOpen() {
        this.root.render(
            <React.StrictMode>
                <DashboardComponent />
            </React.StrictMode>
        );
    }

    async onClose() {
        this.root.unmount()
    }
}
