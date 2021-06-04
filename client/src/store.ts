import {Writable, writable} from "svelte/store";
import type {LayerState, PersonSpline, PlaybackState} from "./types";

export let positionData = writable(null);
export let positionSplines = writable(null as PersonSpline[]);

export let modal = writable('');


// Time Controls
export let markerNowSeconds = writable(0);
export let markerStartEndSeconds = writable({});

// States
export let playbackState: Writable<PlaybackState> = writable('play')
export let layerState: Writable<LayerState> = writable('person')
