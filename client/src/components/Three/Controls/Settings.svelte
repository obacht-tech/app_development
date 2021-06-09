<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";
    import {mask_wear, distance, time_infection, incidence} from "../../../store";

    let mask_wear_value: number = 10;
    let distance_value: number = 10;
    let incidence_value: number = 10;
    let time_infection_value: number = 10;


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
                <p style="margin-top: 0">Maskentragende: {mask_wear_value}%</p>
                <RangeSlider on:change={(value) => mask_wear_value = value.detail.value}
                             on:stop={(value) => mask_wear.set(value.detail.value)}
                             id="range_slider" range="min"
                             values={[mask_wear_value]}/>
                <p>Mindestabstand: {distance_value / 10}m </p>
                <RangeSlider on:change={(value) => distance_value = value.detail.value}
                             on:stop={(value) => {const old = $distance.new ; distance.set({new:value.detail.value/10, old: old})}}
                             min={0} max={50}
                             id="range_slider"
                             range="min" values={[distance_value]}/>
                <p>Inzidenz auf 100tsd: {incidence_value}</p>
                <RangeSlider on:change={(value) => incidence_value = value.detail.value}
                             on:stop={(value) => incidence.set(value.detail.value)}
                             min={0} max={1000}
                             id="range_slider"
                             range="min" values={[incidence_value]}/>
                <p>Zeitlicher Kontakt zur Infektion: {time_infection_value}Sek.</p>
                <RangeSlider on:change={(value) => time_infection_value = value.detail.value}
                             on:stop={(value) => time_infection.set(value.detail.value)}
                             min={0} max={300}
                             id="range_slider" range="min" values={[time_infection_value]}/>
            </div>
        </ControlsModal>
    {/if}

</div>
