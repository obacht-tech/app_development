<script lang="ts">
    export let scrollSnapChild: boolean = false;
</script>

<style lang="sass">

    @import "./../../styles/theme"

    section
        margin: 5rem auto
</style>

<section id="text" class:scroll-snap-child={scrollSnapChild} class="container">
    <slot>
    </slot>
</section>
