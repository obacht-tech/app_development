<script lang="ts">
    export let bottom: boolean = false;
    export let right: boolean = false;
    export let bg: boolean = true;
</script>

<style lang="sass">
    @import "./../theme"

    section
        position: absolute
        top: 4rem
        left: 2rem
        width: max-content
        font-size: $size-normal
        border-radius: $border-radius

    .bottom
        top: auto
        bottom: 2rem

    .right
        left: auto
        right: 2rem

    .background
        background: white
        box-shadow: $shadow-2xl
        padding: 1.5rem
</style>

<section class:bottom={bottom} class:right={right} class:background={bg}>
    <slot/>
</section>
