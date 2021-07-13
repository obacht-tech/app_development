<script lang="ts">
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
    <picture>
        <img alt="Obacht! Logo" src="/client/static/obacht-logo.svg">
    </picture>
    <span><i class="far fa-copyright"></i> 2021</span>
</footer>
