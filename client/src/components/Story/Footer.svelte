<script lang="ts">
    /**
     * Footer Component
     * Developers: Silvia Tosato and Valentin Rogg
     */
    export let scrollSnapChild: boolean = false;
</script>

<style lang="sass">
    @import "./../../styles/scroll-snapping"

    footer
        margin: 15rem auto 10rem

    img
        width: 100px
        height: auto
        margin: 0 auto .5rem
</style>

<footer class:scroll-snap-child={scrollSnapChild} class="container">
    <a href="https://obacht.tech/">
        <picture>
            <img alt="Obacht! Logo" src="/client/static/obacht-logo.svg">
        </picture>
    </a>
    <span><i class="far fa-copyright"></i> 2021</span>
</footer>
