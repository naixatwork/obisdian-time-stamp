import {IconName, ItemView, WorkspaceLeaf} from "obsidian";
import {createRoot} from "react-dom/client";
import * as React from "react";
import {DashboardComponent} from "./dashboard.component";

export class DashboardView extends ItemView {
	public static readonly VIEW_TYPE = "dashboard-view";

	private readonly root = createRoot(this.containerEl.children[1]);

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return DashboardView.VIEW_TYPE;
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
				<DashboardComponent/>
			</React.StrictMode>
		);
	}

	async onClose() {
		this.root.unmount();
	}
}
