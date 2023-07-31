export interface GraphSettings {
    colorGroups: ColorGroup[];
}

export interface ColorGroup {
    color: { a: number, rgb: number },
    query: string
}
