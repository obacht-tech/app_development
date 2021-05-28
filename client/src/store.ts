import {writable} from "svelte/store";

export let positionsData = writable({});
export let positionSplines = writable({});

export let modal = writable('');


// Time Controls
export let markerNowSeconds = writable(0);
export let markerStartEndSeconds = writable({});
