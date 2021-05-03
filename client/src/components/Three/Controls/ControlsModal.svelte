<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

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
    .bg
        position: sticky
        z-index: 800
        top: 0

        left: 0
        display: flex
        flex-direction: column
        justify-content: center
        width: 100vw
        height: 100vh
        background: rgba(0, 0, 0, 0.26)

    .controls-modal
        .modal
            left: -2.8rem
            box-shadow: $shadow-2xl
            background: white
            border-radius: 10px
            font-size: $size-normal

            padding: 1rem
            position: absolute
            bottom: 4rem
            display: inline-block

            label
                margin: 0.2rem 0
                display: block

        .modal:before
            box-shadow: $shadow-2xl
            content: ""
            position: absolute
            height: 0
            width: 0
            left: 3.5rem
            bottom: -2rem
            /* 1px buffer for zooming problems while rendering*/
            border-width: 1rem
            border-color: white transparent transparent transparent
            border-style: solid
</style>

<div class="controls-modal" >
    <div class="modal" use:clickOutside={() => {
		     onCloseModal()
		   }}>
        <slot></slot>
    </div>

</div>
