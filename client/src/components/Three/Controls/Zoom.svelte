<script lang="ts">
    export let cameraZoomLocked: boolean = true;
</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .zoom
        justify-self: center
        align-self: center
        display: flex
        width: max-content
        justify-content: center
        align-content: center
        position: relative
        padding: .5rem

        &:hover
            cursor: pointer

            .locked-icon:not(.locked-visible)
                opacity: 1
                color: lighten($blue, 10)

            .locked-icon.locked-visible
                opacity: 0 !important

            .unlocked-icon.unlocked-visible
                opacity: 1 !important
                color: lighten($blue, 10)


        &:active
            .locked-icon:not(.locked-visible)
                opacity: 1
                color: $blue

        .locked-icon, .unlocked-icon
            color: $blue
            font-size: .7em
            position: absolute
            bottom: -2px
            left: -2px
            opacity: 0
            transition: ease-in-out 25ms

        .locked-visible
            opacity: 1 !important

        .unlocked-visible
            opacity: 0 !important
</style>

<div class="zoom" on:click={() => {cameraZoomLocked = !cameraZoomLocked}}>
    <i class="fas fa-search"></i>
    <span class="locked-icon" class:locked-visible={cameraZoomLocked}><i class="fas fa-lock"></i></span>
    <span class="unlocked-icon" class:unlocked-visible={cameraZoomLocked}><i class="fas fa-lock-open"></i></span>
</div>
