<script lang="ts">
    /**
     * Settings Component
     * Developer: Silvia Tosato
     */
    import RangeSlider from "svelte-range-slider-pips";
    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";
    import {maskWear, distance, timeInfection, incidence} from "../../../store";

    let distanceValue = 15;
    let incidenceValue = 200;
    let timeInfectionValue = 0;
    let maskWearValue = 90;


    /**
     * open Modal
     *
     * @param {*} event
     */
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
                display: inline-block
            .text-right
                text-align: right
                font-size: $size-normal
                line-height: $size-normal
                float: right
                margin: 1.5rem 0 0.5rem 0

</style>

<div class="settings">
    <div class="settings__icon" on:click={showModal}>
        <i class="fas fa-cog"></i>
    </div>

    {#if $modal === 'settings'}
        <ControlsModal positionArrow="settings" on:close={()=>modal.set('')}>
            <div class="settings__modal">
                <p>Mindestabstand:  </p> <span class="text-right">{distanceValue / 10}m</span>
                <RangeSlider on:change={(value) => distanceValue = value.detail.value}
                             on:stop={(value) => {const old = $distance.new ; distance.set({new:value.detail.value/10, old: old})}}
                             min={5} max={30}
                             id="range_slider"
                             range="min" values={[distanceValue]}/>
                <p>Maskentragende: </p><span class="text-right">{maskWearValue}%</span>
                <RangeSlider on:change={(value) => maskWearValue = value.detail.value}
                             disabled
                             on:stop={(value) => {const old = $maskWear.new ; maskWear.set({new:value, old: old})}}
                             id="range_slider" range="min"
                             values={[maskWearValue]}/>
                <p>Inzidenz auf 100tsd: </p><span class="text-right">{incidenceValue}</span>
                <RangeSlider on:change={(value) => incidenceValue = value.detail.value}
                             on:stop={(value) => {const old = $incidence.new ; incidence.set({new: value.detail.value, old: old})}}
                             min={0} max={10000}
                             disabled
                             id="range_slider"
                             range="min" values={[incidenceValue]}/>
                <p>Zeitlicher Kontakt zur Infektion: </p><span class="text-right">{timeInfectionValue}Sek.</span>
                <RangeSlider on:change={(value) => timeInfectionValue = value.detail.value}
                             on:stop={(value) => timeInfection.set(value.detail.value)}
                             disabled
                             min={0} max={300}
                             id="range_slider" range="min" values={[timeInfectionValue]}/>
            </div>
        </ControlsModal>
    {/if}

</div>
