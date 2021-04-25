<script lang="ts">
    import {onMount} from "svelte";
    import Canvas from "./Three/Canvas.svelte";
    import Timeline from "./Timeline.svelte";
    import Controls from "./Controls.svelte";

    type ApplicationID = "person" | "headmap" | "pathmap" | "full";
    export let aid: ApplicationID = "full";

    export let scrollSnapChild: boolean = false;

    let inFrame;


    onMount(() => {
        let observer = new IntersectionObserver(entries => {
            for (let entry of entries) {
                if (entry.intersectionRatio > 0.5) {
                    entry.target.classList.add('yellow');
                    if (!inFrame) {
                        inFrame = true;
                    }
                } else {
                    entry.target.classList.remove('yellow');
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
    @import "./../styles/scroll-snapping"
    @import "./../styles/theme"

    section
        margin: 5rem auto
        height: clamp(0px, 100vh, 991.98px)
</style>

<section id={aid} class:scroll-snap-child={scrollSnapChild} class="container">
    <Canvas cid={aid + 'Canvas'} aid={aid} inFrame={inFrame}/>
    <Timeline/>
    <Controls />
</section>
