<script lang="ts">
    import Three from "./components/Three/Three.svelte";
    import Card from "./components/Card.svelte";
    import Timeline from "./components/Timeline.svelte";
    import Controls from "./components/Controls.svelte";

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

<svelte:head>
    <link rel="shortcut icon" type="image/png" href="/client/static/obacht-human-195.png"/>
    <script src="https://kit.fontawesome.com/3a515d3a9f.js" crossorigin="anonymous"></script>
</svelte:head>

<main>
    <Three />
    <Timeline />
    <Controls />
<!--    <Card bottom={false} right={false}>-->
<!--        Got Feedback?-->
<!--        <br/>-->
<!--        Contact <div class="badge"> <a href="mailto:mail@valentinrogg.de" id="creator">@ValentinRogg</a> </div>-->
<!--        <img width="128" src="/client/static/obacht-logo.svg">-->
<!--    </Card>-->
</main>
