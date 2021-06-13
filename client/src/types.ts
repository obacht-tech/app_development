import type {SplineCurve, Vector2} from "three";

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
    pos: number[],
    deltaNext?: number[]
}

export type PersonSpline = {
    pid: string,
    spline?: SplineCurve,
    splineData: Vector2[],
    timePosition?: number,
    startDate: string,
    timeDelta?: number
}

export type Object3DCustom = THREE.Object3D &
    {
        timePosition?: number,
        timeDelta?: number,
        spline?: SplineCurve,
        material?: any,
        isMesh?: boolean,
        mixer?: THREE.AnimationMixer
    }

export type HeatmapPoint = {
    x: number,
    y: number,
    value?: number
}
