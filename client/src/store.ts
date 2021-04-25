import {writable} from "svelte/store";
import {Object3D} from "three";

export let positions = writable({});
export let environment = writable(Object3D);
