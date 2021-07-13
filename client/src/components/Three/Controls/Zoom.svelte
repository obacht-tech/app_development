<script lang="ts">
    /**
     * Zoom Component
     * Developers: Silvia Tosato and Valentin Rogg
     */
    export let cameraZoomLocked: boolean = true;
</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .zoom
        justify-self: center
        align-self: center
        display: flex
        width: 3rem
        justify-content: center
        align-content: center
        position: relative
        padding: 0.5rem .9rem


        .lock-icon
            color: $blue
            font-size: .7em
            position: absolute
            bottom: 5px
            left: 5px
            transition: ease-in-out 25ms

</style>

<div class="zoom" on:click={() => {cameraZoomLocked = !cameraZoomLocked}}>
    <i class="fas fa-search"></i>
    {#if cameraZoomLocked}
        <span class="lock-icon"><i class="fas fa-lock"></i></span>
    {:else }
        <span class="lock-icon"><i class="fas fa-lock-open"></i></span>
    {/if}
</div>
