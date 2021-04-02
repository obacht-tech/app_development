<script lang="ts">
    import Three from "./components/Three/Three.svelte";
    import Card from "./components/Card.svelte";

    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "theme"
    //@import "global"

    html, body
        margin: 0
        padding: 0

    main
        font-family: "IBM Plex Sans", sans-serif
        width: 100%
        height: 100%
        display: block

</style>

<main>
    <Three />
    <Card />
</main>
