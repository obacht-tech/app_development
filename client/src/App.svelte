<script lang="ts">
    import Three from "./components/Three.svelte";
    import Card from "./components/Card.svelte";

    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "theme"
    @import "global"

    main
        font-family: "IBM Plex Sans", sans-serif
        width: 100%
        height: 100%
        display: block

</style>

<main>
    <Card />
    <Three />
</main>
