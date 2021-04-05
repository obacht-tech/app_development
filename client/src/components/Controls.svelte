<style lang="sass">
    @import "./../theme"

    .controls
        position: fixed
        bottom: 1rem
        left: 1rem
        width: calc(100% - 2rem - 3rem)
        font-size: 2rem
        padding: 1.5rem
        display: flex
        justify-content: space-between


    .playback

        .icon
            margin-right: 1rem

        .forward
            font-size: 2.6rem


    .playback,.camera,.layers
        display: flex
        align-items: center

    .blue
        color: $blue
</style>

<section class="controls">
    <div class="playback">
        <div>
            <i class="fas fa-play icon blue"></i>
        </div>
        <div>
            <i class="fas fa-forward icon forward"></i>
        </div>
        <div>
            <i class="fas fa-stop icon"></i>
        </div>
    </div>

    <div class="camera">
        <i class="fas fa-camera-movie"></i>
    </div>

    <div class="layers">
        <i class="fad fa-layer-group"></i>
    </div>

</section>
