<script lang="ts">

    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";

    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let layerState: LayerState = "person";

    const showModal = (event) => {
        event.stopPropagation();
        if ($modal === '' || $modal === 'settings') {
            modal.set('layers');
        } else {
            modal.set('')

        }
    };

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

    {#if $modal==='layers'}
        <ControlsModal positionArrow="layers" on:close={()=>modal.set('')}>
            <div class="layers__modal">
                <label>
                    <input type=radio bind:group={layerState} value={"person"}>
                    Personen
                </label>
                <label>
                    <input type=radio bind:group={layerState} value={"heatmap"}>
                    Heatmap
                </label>

                <label>
                    <input type=radio bind:group={layerState} value={"paths"}>
                    Pfadmap
                </label>
            </div>
        </ControlsModal>
    {/if}
</div>
