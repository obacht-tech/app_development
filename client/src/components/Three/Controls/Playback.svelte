<script lang="ts">
    /**
     * Playback Component
     * Developer: Silvia Tosato
     */
    import {playbackState} from "../../../store";

    type PlaybackState = "play" | "2x forward" | "stop";

    /**
     * set playback state
     *
     * @param {PlaybackState} state
     */
    function handlePlay(state: PlaybackState) {
        if (state === "play") {
            playbackState.set("2x forward")
        } else {
            playbackState.set("play")
        }

    }
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
            padding: 0 .2rem
            font-size: 1.3rem
            width: 1.3rem

            &:hover
                cursor: pointer
                color: lighten($blue, 10)

            &:active
                color: $blue !important

        .active
            color: $blue
</style>

<div class="playback">
    <div class="play" class:active={$playbackState === "play" |$playbackState === "2x forward" }
         on:click={handlePlay($playbackState)}>
        {#if $playbackState === '2x forward'}
            <div>
                <i class="fas fa-forward"></i>
            </div>
        {:else}
            <div>
                <i class="fas fa-play"></i>
            </div>
        {/if}
    </div>
    <div class="stop" class:active={$playbackState === "stop"} on:click={() => { playbackState.set("stop")}}>
        <i class="fas fa-stop"></i>
    </div>
</div>
