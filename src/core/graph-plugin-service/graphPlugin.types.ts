import {TFile} from "obsidian";

export interface GraphSettings {
    colorGroups: ColorGroup[];
}

export interface ColorGroup {
    color: { a: number, rgb: number },
    query: string
}

export interface GraphGroup {
    name: string,
    group: ColorGroup,
    associatedFiles: TFile[],
}
