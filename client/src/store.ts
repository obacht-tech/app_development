import {writable} from "svelte/store";
import type {PersonSpline} from "./types";

export let positionData = writable(null);
export let positionSplines = writable(null as PersonSpline[]);

export let modal = writable('');


// Time Controls
export let markerNowSeconds = writable(0);
export let markerStartEndSeconds = writable({});
export let playbackState = writable('play')
