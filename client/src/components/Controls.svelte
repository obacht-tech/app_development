<script lang="ts">
    export let camera: boolean = true;
    export let layers: boolean = true;

</script>
<style lang="sass">
    @import "./../theme"

    .controls
        position: absolute
        bottom: 2rem

        width: 100%
        font-size: 2rem
        display: flex
        justify-content: space-evenly


    .playback

        .icon
            margin-right: 1rem

        .forward
            font-size: 2.6rem


    .playback, .camera, .layers
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
    {#if camera}
        <div class="camera">
            <i class="fas fa-camera-movie"></i>
        </div>
    {/if}
    {#if layers}
        <div class="layers">
            <i class="fad fa-layer-group"></i>
        </div>
    {/if}
</section>
