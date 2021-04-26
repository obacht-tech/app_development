<script lang="ts">
    import Zoom from "./Zoom.svelte";
    import Playback from "./Playback.svelte";
    import Layers from "./Layers.svelte";

    type PlaybackState = "play" | "2x forward" | "stop";
    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let zoomLock: boolean = false;
    export let playback: boolean = false;
    export let layers: boolean = false;
    export let cameraZoomLocked: boolean = true;
    export let playbackState: PlaybackState;
    export let layerState: LayerState;

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .controls
        position: absolute
        bottom: 3rem
        width: clamp(0px, 100vw, 400px)
        left: 0
        right: 0
        margin: 0 auto
        padding: 0 2rem
        font-size: 1.5rem
        display: grid
        grid-template-columns: 1fr 1fr 1fr
</style>

<div class="controls container">
    {#if zoomLock}
        <Zoom bind:cameraZoomLocked={cameraZoomLocked}/>
    {/if}

    {#if playback}
        <Playback bind:playbackState={playbackState}/>
    {/if}
    {#if layers}
        <Layers bind:layerState={layerState}/>
    {/if}
</div>
