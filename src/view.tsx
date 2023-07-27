import { ItemView, WorkspaceLeaf } from "obsidian";
import {ReactView} from "./test";
import {createRoot} from "react-dom/client";
import * as React from "react";
import * as ReactDOM from "react-dom";
export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_EXAMPLE;
    }

    getDisplayText() {
        return "Example view";
    }

    async onOpen() {
        const root = createRoot(this.containerEl.children[1]);
        root.render(
            <React.StrictMode>
                <ReactView />,
            </React.StrictMode>
        );
    }

    async onClose() {
        ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
    }
}
