<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let camera: boolean = true;
    export let layers: boolean = true;
    let cameraLocked: boolean = true;
    const changeCamera = () => {
        cameraLocked = !cameraLocked;
        console.log(cameraLocked);
        dispatch('cameraLock', {cameraLocked});
    }

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

    .camera
        position: relative

        .over-icon
            color: $blue
            font-size: 1rem
            position: absolute
            bottom: 0
            left: 0

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
        <div class="camera" on:click={changeCamera}>
            {#if cameraLocked}
                <div>
                </div>
                <!--                <i class="fas over-icon fa-lock" ></i>-->
                true
            {/if}
            <i class="fas fa-camera-movie"></i>
        </div>
    {/if}
    {#if layers}
        <div class="layers">
            <i class="fad fa-layer-group"></i>
        </div>
    {/if}
</section>
