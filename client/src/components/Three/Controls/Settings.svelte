<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";

    export let mask_wear: number = 10;
    export let distance: number = 10;
    export let incidence: number = 10;
    export let time_infection: number = 10;


    const showModal = (event) => {
        event.stopPropagation()
        if ($modal === '' || $modal === 'layers') {
            modal.set('settings');
        } else {
            modal.set('')

        }

        console.log($modal)
    };

</script>

<style lang="sass">
    @import "./../../../styles/theme"
    .bg
        position: sticky
        z-index: 1000
        top: 0

        left: 0
        display: flex
        flex-direction: column
        justify-content: center
        width: 100vw
        height: 100vh
        background: rgba(0, 0, 0, 0.26)

    .layers
        justify-self: center
        align-self: center
        display: flex
        width: max-content
        justify-content: center
        align-items: center
        position: relative
        padding: .5rem

        &__modal
            width: 10rem


</style>

<div class="layers">
    <div on:click={showModal} class="layers">
        <i class="fas fa-cog"></i>
    </div>

    {#if $modal==='settings'}
<ControlsModal on:close={()=>modal.set('')}>
    <div class="layers__modal">
        <p>Maskentragende</p>
        <RangeSlider  id="range_slider" range="min" values={[50]} />
        <p>Mindestabstand</p>
        <RangeSlider  id="range_slider" range="min" values={[50]} />
        <p>Inzidenz auf 100tsd</p>
        <RangeSlider  id="range_slider" range="min" values={[50]} />
        <p>Zeitlicher Kontakt zur Infektion</p>
        <RangeSlider  id="range_slider" range="min" values={[50]} />
    </div>
</ControlsModal>



    {/if}

</div>
