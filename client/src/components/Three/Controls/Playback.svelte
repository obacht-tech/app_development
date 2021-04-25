<script lang="ts">
    type PlaybackState = "play" | "2x forward" | "stop";

    export let playbackState: PlaybackState = "play";
</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .playback
        justify-self: center
        align-self: center
        display: flex
        width: max-content
        justify-content: center
        align-content: center
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
                color: $blue !important

        .active
            color: $blue
</style>

<div class="playback">
    <div class="play" class:active={playbackState === "play"} on:click={() => {playbackState = "play"}}>
        <i class="fas fa-play"></i>
    </div>
    <div class="stop" class:active={playbackState === "stop"} on:click={() => {playbackState = "stop"}}>
        <i class="fas fa-stop"></i>
    </div>
</div>
