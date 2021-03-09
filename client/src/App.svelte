<script lang="ts">
    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "global"

    main
        padding: 1em
        margin: 0
        font-family: "Lexend Deca", Arial, sans-serif
        display: grid
        grid-template-columns: 1fr minmax(0, 2fr)
        grid-template-rows: 22rem auto auto
        height: calc(100vh - 4rem)

    footer
        margin: 1rem 0 0 1rem
        font-size: $size-small

    #creator
        text-decoration: none
        color: $x-cyan
</style>

<main>
    <footer>
        <strong>Hello</strong> brainy friend! 😃 Got Feedback? Contact <a href="mailto:valentin.rogg@xentral.com" id="creator">@ValentinRogg</a>
    </footer>
</main>
