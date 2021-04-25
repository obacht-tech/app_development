<script lang="ts">
    export let camera: boolean = false;
    export let layers: boolean = false;
    export let cameraZoomLocked: boolean = true;

    type playbackState = "play" | "2x forward" | "stop";
    export let playbackState: playbackState = "play";

</script>

<style lang="sass">
    @import "./../../styles/theme"

    .controls
        position: absolute
        bottom: 3rem
        width: clamp(0px, 100vw, 400px)
        left: 0
        right: 0
        margin: 0 auto
        padding: 0 2rem
        font-size: 1.5rem
        display: grid
        grid-template-columns: 1fr 1fr 1fr

        >*
            justify-self: center
            align-self: center
            display: flex
            width: max-content
            justify-content: center
            align-items: center

    .playback
        grid-column: 2 / 3

        div:not(:last-of-type)
            margin-right: 1rem

        .play, .stop
            transition: ease-in-out 25ms
            padding: .5rem

            &:hover
                cursor: pointer
                color: lighten($blue, 10)

            &:active
                //color: darken($blue, 10) !important
                color: $blue !important

        .active
            color: $blue

    .zoom
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

<div class="controls container">
    {#if camera}
        <div class="zoom" on:click={() => {cameraZoomLocked = !cameraZoomLocked}}>
            <i class="fas fa-search"></i>
            <span class="locked-icon" class:locked-visible={cameraZoomLocked}><i class="fas fa-lock"></i></span>
            <span class="unlocked-icon" class:unlocked-visible={cameraZoomLocked}><i class="fas fa-lock-open"></i></span>
        </div>
    {/if}

    <div class="playback">
        <div class="play" class:active={playbackState === "play"} on:click={() => {playbackState = "play"}}>
            <i class="fas fa-play"></i>
        </div>
        <div class="stop" class:active={playbackState === "stop"} on:click={() => {playbackState = "stop"}}>
            <i class="fas fa-stop"></i>
        </div>
    </div>

    {#if layers}
        <div class="layers">
            <i class="fas fa-layer-group"></i>
        </div>
    {/if}
</div>
