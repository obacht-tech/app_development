<script lang="ts">

    import {modal} from "../../../store";
    import ControlsModal from "./ControlsModal.svelte";

    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let layerState: LayerState = "person";

    let targetEl;
    let background

    const showModal = (event) => {
        // ignore first click
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
        width: max-content
        justify-content: center
        align-items: center
        position: relative
        padding: .5rem


</style>

<div class="layers">
    <div on:click={showModal} bind:this={targetEl} class="layers">
        <i class="fas fa-layer-group"></i>
    </div>

    {#if $modal==='layers'}
  <!--      <Modal show={$modaltest}>
        </Modal>-->

        <ControlsModal on:close={()=>modal.set('')}>
            <div>
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
