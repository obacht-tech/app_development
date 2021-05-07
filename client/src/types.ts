export type ApplicationID = "person" | "heatmap" | "paths" | "full";

export type PlaybackState = "play" | "2x forward" | "stop";

export type LayerState = "person" | "heatmap" | "paths" | "full";

export type CanvasID = "personCanvas" | "heatmapCanvas" | "pathmapCanvas" | "fullCanvas";

export type PositionData = {
    date: string,
    people: Person[]
}

export type Person = {
    pid: string,
    pos: number[]
}
