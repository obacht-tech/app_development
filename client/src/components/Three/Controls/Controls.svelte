<script lang="ts">
    import Zoom from "./Zoom.svelte";
    import Layers from "./Layers.svelte";
    import Settings from "./Settings.svelte";

    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let zoomLock: boolean = false;
    export let layers: boolean = false;
    export let settings: boolean = false;
    export let cameraZoomLocked: boolean = true;
    export let layerState: LayerState;


</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .controls
        position: absolute
        bottom: 2.5rem
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
            <Zoom class="controls__icon" bind:cameraZoomLocked={cameraZoomLocked}/>
        {/if}

        {#if layers}
            <Layers class="controls__icon" bind:layerState={layerState}/>
        {/if}

        {#if settings}
            <Settings class="controls__icon" bind:layerState={layerState}/>
        {/if}
    </div>

</div>
