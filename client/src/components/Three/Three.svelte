<script lang="ts">
    import {onMount} from "svelte";
    import Canvas from "./Canvas.svelte";
    import Timeline from "./Timeline/Timeline.svelte";
    import Controls from "./Controls/Controls.svelte";

    type ApplicationID = "person" | "heatmap" | "paths" | "full";
    type PlaybackState = "play" | "2x forward" | "stop";
    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let aid: ApplicationID = "full";
    export let scrollSnapChild: boolean = false;

    let inFrame: boolean;
    let cameraZoomLocked: boolean = true;
    let playbackState: PlaybackState = "play";
    let layerState: LayerState;
    let start: Date;
    let now: Date;
    let end: Date;

    onMount(() => {
        let observer = new IntersectionObserver(entries => {
            for (let entry of entries) {
                if (entry.intersectionRatio > 0.5) {
                    // entry.target.classList.add('yellow');
                    if (!inFrame) {
                        inFrame = true;
                    }
                } else {
                    // entry.target.classList.remove('yellow');
                    if (inFrame) {
                        inFrame = false;
                    }
                }
            }
        }, {
            threshold: [0.0, 0.5, 0.5, 1.0]
        })
        observer.observe(document.querySelector(`#${aid}`));
    })


</script>

<style lang="sass">
    @import "./../../styles/scroll-snapping"
    @import "./../../styles/theme"

    section
        position: relative
        margin: 5rem auto
        height: clamp(0px, 100vh, 991.98px)
</style>

<section id={aid} class:scroll-snap-child={scrollSnapChild}>
    {#if aid === "person"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} cameraZoomLocked={cameraZoomLocked} layerState={"person"}/>
        <Timeline bind:now={now}/>
        <Controls playback bind:playbackState={playbackState} bind:cameraZoomLocked={cameraZoomLocked} />
    {/if}

    {#if aid === "heatmap"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} layerState={"heatmap"}/>
        <Timeline bind:start={start} bind:now={now} bind:end={end}/>
        <Controls bind:playbackState={playbackState}/>
    {/if}

    {#if aid === "paths"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} layerState={"paths"}/>
        <Timeline bind:start={start} bind:now={now} bind:end={end}/>
        <Controls bind:playbackState={playbackState}/>
    {/if}

    {#if aid === "full"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} enableCameraControls cameraZoomLocked={cameraZoomLocked} layerState={layerState}/>
        <Timeline bind:start={start} bind:now={now} bind:end={end}/>
        <Controls zoomLock playback layers bind:layerState={layerState} bind:playbackState={playbackState} bind:cameraZoomLocked={cameraZoomLocked}/>
    {/if}
</section>
