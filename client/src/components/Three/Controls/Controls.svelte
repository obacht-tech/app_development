<script lang="ts">
    /**
     * Controls Component
     * Developer: Silvia Tosato
     */

    import Zoom from "./Zoom.svelte";
    import Layers from "./Layers.svelte";
    import Settings from "./Settings.svelte";

    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let zoomLock: boolean = false;
    export let layers: boolean = false;
    export let settings: boolean = false;
    export let cameraZoomLocked: boolean = true;
    export let layerState: LayerState = 'person';

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .controls
        position: absolute
        bottom: -3rem
        width: clamp(0px, 100vw, 400px)
        left: 0
        right: 0
        margin: 0 auto

        &__container
            font-size: 1.5rem
            display: flex
            justify-content: center
            position: relative

</style>

<div class="controls container">
    <div class="controls__container">
        {#if zoomLock}
            <Zoom bind:cameraZoomLocked={cameraZoomLocked}/>
        {/if}

        {#if layers}
            <Layers bind:layerState={layerState}/>
        {/if}

        {#if settings}
            <Settings/>
        {/if}
    </div>

</div>
