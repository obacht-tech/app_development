<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import { fade } from 'svelte/transition';

    export let positionArrow: 'settings' | 'layers' = 'settings';

    const dispatch = createEventDispatcher();

    const animate = (node, args) => fade(node, {duration: 80});

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
            bottom: 4rem
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
            bottom: -1.9rem
            /* 1px buffer for zooming problems while rendering*/
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
