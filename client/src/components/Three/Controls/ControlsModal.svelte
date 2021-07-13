<script lang="ts">
    /**
     * Controls Component
     * Developer: Silvia Tosato
     */

    import {createEventDispatcher} from "svelte";
    import { fade } from 'svelte/transition';
    import type {ModalType} from "../../../types";

    export let positionArrow: ModalType = 'settings';

    const dispatch = createEventDispatcher();

    const animate = (node) => fade(node, {duration: 80});
    /**
     * Controls Component
     * Developer: Silvia Tosato
     */
    function onCloseModal() {
        dispatch('close', {});
    }

    function clickOutside(element, callbackFunction) {
        function onClick(event) {
            if (!element.contains(event.target)) {
                callbackFunction();
            }
        }

        document.body.addEventListener('click', onClick);

        return {
            update(newCallbackFunction) {
                callbackFunction = newCallbackFunction;
            },
            destroy() {
                document.body.removeEventListener('click', onClick);
            }
        }
    }
</script>

<style lang="sass">
    @import "./../../../styles/theme"
    .controls-modal
        .modal
            bottom: 3.5rem
            left: 50%
            transform: translate(-50%, 0)
            height: min-content
            box-shadow: $shadow-2xl
            background: white
            border-radius: 4px
            font-size: $size-normal
            width: 110%
            min-width: 10rem
            padding: 1rem
            position: absolute
            display: inline-block

        .modal:before
            box-shadow: $shadow-2xl
            content: ""
            position: absolute
            height: 0
            width: 0
            left: var(--left-arrow)
            bottom: -1.7rem
            border-width: 1rem
            border-color: white transparent transparent transparent
            border-style: solid
</style>

<div class="controls-modal" transition:animate>
    <div class="modal" style={positionArrow==='settings'?"--left-arrow: 60%": '--left-arrow: 40%' } use:clickOutside={() => {
		     onCloseModal()
		   }}>
        <slot></slot>
    </div>
</div>
