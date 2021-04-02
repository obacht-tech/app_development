<script lang="ts">
    import { onMount } from 'svelte';
    import main from "./three";


    onMount(() => {
        main();
    })


</script>

<style lang="sass">
    #three
        margin: auto
        padding: 0
        position: absolute
        display: block
        height: 100%
        width: 100%
        top: 0

    canvas
        display: block
        height: 100%
        width: 100%
</style>

<section id="three">
    <canvas class="webgl"></canvas>
</section>
