<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";

    let mask_wear: number = 10;
    let distance: number = 10;
    let incidence: number = 10;
    let time_infection: number = 10;


    const showModal = (event) => {
        event.stopPropagation()
        if ($modal === '' || $modal === 'layers') {
            modal.set('settings');
        } else {
            modal.set('')
        }
    };

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .settings
        justify-self: center
        align-self: center
        display: flex
        justify-content: center
        align-items: center
        padding: .5rem
        width: 3rem

        &__modal
            padding: .5rem
            width: 100%

            p
                font-size: $size-normal
                line-height: $size-normal
                margin: 1.5rem 0 0.5rem 0

</style>

<div class="settings">
    <div class="settings__icon" on:click={showModal}>
        <i class="fas fa-cog"></i>
    </div>

    {#if $modal === 'settings'}
        <ControlsModal positionArrow="settings" on:close={()=>modal.set('')}>
            <div class="settings__modal">
                <p>Maskentragende: {mask_wear}%</p>
                <RangeSlider on:change={(value) => mask_wear = value.detail.value}  id="range_slider" range="min"
                             values={[mask_wear]}/>
                <p>Mindestabstand: {distance/10}m </p>
                <RangeSlider on:change={(value) => distance = value.detail.value} min={0} max={50} id="range_slider"
                             range="min" values={[distance]}/>
                <p>Inzidenz auf 100tsd: {incidence}</p>
                <RangeSlider on:change={(value) => incidence = value.detail.value} min={0} max={1000} id="range_slider"
                             range="min" values={[incidence]}/>
                <p>Zeitlicher Kontakt zur Infektion: {time_infection}Sek.</p>
                <RangeSlider on:change={(value) => time_infection = value.detail.value} min={0} max={300}
                             id="range_slider" range="min" values={[time_infection]}/>
            </div>
        </ControlsModal>


    {/if}

</div>
