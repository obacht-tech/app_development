<script lang="ts">
    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let layerState: LayerState;
</script>

<style lang="sass">
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
    <i class="fas fa-layer-group"></i>
</div>
