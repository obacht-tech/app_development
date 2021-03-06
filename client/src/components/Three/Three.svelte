<script lang="ts">
    /**
     * Timeline Component
     * Developers: Silvia Tosato and Valentin Rogg
     */
    import {onMount} from "svelte";
    import Canvas from "./Canvas.svelte";
    import Timeline from "./Timeline/Timeline.svelte";
    import Controls from "./Controls/Controls.svelte";
    import datasetDates from "../../env";
    import type {ApplicationID} from "../../types";


    export let aid: ApplicationID = "full";
    export let scrollSnapChild: boolean = false;

    let inFrame: boolean;
    let cameraZoomLocked: boolean = true;
    let markerStart: Date = datasetDates.start;
    let markerNow: Date = datasetDates.start;
    let markerEnd: Date = datasetDates.end;

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
        height: clamp(0px, 90vh, 991.98px)
    .info-footer
        margin: 4rem 1rem
</style>

<section id={aid} class:scroll-snap-child={scrollSnapChild}>
    {#if aid === "person"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} cameraZoomLocked={cameraZoomLocked}/>
        <Timeline indicator range={false} playback datasetStart={datasetDates.start} datasetEnd={datasetDates.end} bind:markerNow={markerNow}/>
    {/if}

    {#if aid === "heatmap"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame}/>
        <Timeline datasetStart={datasetDates.start} datasetEnd={datasetDates.end} bind:markerStart={markerStart} bind:markerNow={markerNow} bind:markerEnd={markerEnd}/>
    {/if}

    {#if aid === "paths"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame}/>
        <Timeline datasetStart={datasetDates.start} datasetEnd={datasetDates.end} bind:markerStart={markerStart} bind:markerNow={markerNow} bind:markerEnd={markerEnd}/>
    {/if}

    {#if aid === "full"}
        <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame} enableCameraControls cameraZoomLocked={cameraZoomLocked} />
        <Timeline indicator playback datasetStart={datasetDates.start} datasetEnd={datasetDates.end} bind:markerStart={markerStart} bind:markerNow={markerNow} bind:markerEnd={markerEnd}/>
        <Controls zoomLock settings layers bind:cameraZoomLocked={cameraZoomLocked}/>
        <h6 class="info-footer">*trifft auf die aufgenommenen Personen in der Zeit von 14:56 bis 15:46 am 06.07.20 im Scheazlerpalais Augsburg, Raum 304 zu.</h6>
    {/if}
</section>
