<script lang="ts">
    /**
     * Layers Component
     * Developer: Silvia Tosato
     */

    import {layerState, modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";

    /**
     * open Modal
     *
     * @param {*} event
     */
    function showModal(event) {
        event.stopPropagation();
        if ($modal === '' || $modal === 'settings') {
            modal.set('layers');
        } else {
            modal.set('')

        }
    }

    /**
     * set layerState value
     *
     * @param {*} event
     */
    function onChange(event) {
        if (!event.currentTarget) {
            return
        }
        layerState.set(event.currentTarget.value)
    }

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .layers
        justify-self: center
        align-self: center
        display: flex

        justify-content: center
        align-items: center
        position: relative
        padding: 1rem

        &__modal
            min-width: 5rem

            label
                margin: 0.2rem 0
                display: block

</style>

<div class="layers">
    <div on:click={showModal} class="layers__icon">
        <i class="fas fa-layer-group"></i>
    </div>

    {#if $modal === 'layers'}
        <ControlsModal positionArrow="layers" on:close={()=>modal.set('')}>
            <div class="layers__modal">
                <label>
                    <input type=radio checked={$layerState==="person"} value={"person"} on:change={onChange}>
                    Personen
                </label>
                <label>
                    <input type=radio checked={$layerState==="heatmap"} value={"heatmap"} on:change={onChange}>
                    Heatmap
                </label>
                <label>
                    <input type=radio checked={$layerState==="paths"} value={"paths"} on:change={onChange}>
                    Pfadmap
                </label>
            </div>
        </ControlsModal>
    {/if}
</div>
