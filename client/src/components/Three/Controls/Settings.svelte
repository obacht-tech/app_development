<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";
    import {maskWear, distance, timeInfection, incidence} from "../../../store";

    let distanceValue = 10;
    let incidenceValue = 200;
    let timeInfectionValue = 0;
    let maskWearValue = 10;



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
                <p style="margin-top: 0">Maskentragende: {maskWearValue}%</p>
                <RangeSlider on:change={(value) => maskWearValue = value.detail.value}
                             on:stop={(value) => {const old = $maskWear.new ; maskWear.set({new:value, old: old})}}
                             id="range_slider" range="min"
                             values={[maskWearValue]}/>
                <p>Mindestabstand: {distanceValue / 10}m </p>
                <RangeSlider on:change={(value) => distanceValue = value.detail.value}
                             on:stop={(value) => {const old = $distance.new ; distance.set({new:value.detail.value/10, old: old})}}
                             min={5} max={30}
                             id="range_slider"
                             range="min" values={[distanceValue]}/>
                <p>Inzidenz auf 100tsd: {incidenceValue}</p>
                <RangeSlider on:change={(value) => incidenceValue = value.detail.value}
                             on:stop={(value) => {const old = $incidence.new ; incidence.set({new: value.detail.value, old: old})}}
                             min={0} max={10000}
                             id="range_slider"
                             range="min" values={[incidenceValue]}/>
                <p>Zeitlicher Kontakt zur Infektion: {timeInfectionValue}Sek.</p>
                <RangeSlider on:change={(value) => timeInfectionValue = value.detail.value}
                             on:stop={(value) => timeInfection.set(value.detail.value)}
                             min={0} max={300}
                             id="range_slider" range="min" values={[timeInfectionValue]}/>
            </div>
        </ControlsModal>
    {/if}

</div>
