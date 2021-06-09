import {Writable, writable} from "svelte/store";
import type {LayerState, ModalType, PersonSpline, PlaybackState, RangeTime} from "./types";

// Position Data
export let positionData = writable(null);
export let positionSplines:  Writable<PersonSpline[]> = writable(null as PersonSpline[]);

// Modals
export let modal:  Writable<ModalType> = writable('');


// Time Controls
export let markerNowSeconds:  Writable<number> = writable(0);
export let markerStartEndSeconds = writable({} as RangeTime);

// States
export let playbackState: Writable<PlaybackState> = writable('play')
export let layerState: Writable<LayerState> = writable('person')

// Settings
export let mask_wear: Writable<number> = writable(0)
export let distance: Writable<{old: number, new: number}> = writable({old: 1, new: 1})
export let incidence: Writable<number> = writable(0)
export let time_infection: Writable<number> = writable(0)
