import {writable} from "svelte/store";

export let positions = writable({});
export let modal = writable('');
export let time = writable(0);


// Time Controls
export let timeCurrentSeconds = writable(0);

