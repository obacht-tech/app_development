import {Writable, writable} from "svelte/store";
import type {LayerState, ModalType, OldNewValue, PersonSpline, PlaybackState, RangeTime} from "./types";

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
export let maskWear: Writable<OldNewValue> = writable({old: 10, new: 10});
export let distance: Writable<OldNewValue> = writable({old: 2, new: 2});
export let incidence: Writable<OldNewValue> = writable({old: 200, new: 200});
export let timeInfection: Writable<number> = writable(0);

export let infectionRate: Writable<number> = writable(0);
