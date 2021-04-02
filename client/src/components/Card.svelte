<script lang="ts">
    export let bottom: boolean = false;
    export let right: boolean = false;
</script>

<style lang="sass">
    @import "./../theme"

    section
        background: white
        position: absolute
        top: 4rem
        left: 2rem
        width: max-content
        font-size: $size-normal
        padding: 1.5rem
        box-shadow: $shadow-2xl
        border-radius: $border-radius

    .bottom
        top: auto
        bottom: 2rem

    .right
        left: auto
        right: 2rem
</style>

<section class:bottom={bottom} class:right={right}>
    <slot/>
</section>
