<script lang="ts">
    type LayerState = "person" | "heatmap" | "paths" | "full";

    export let layerState: LayerState = "person";
</script>

<style lang="sass">
    .popup


</style>

<div class="popup">
    <div>
        <label>
            <input type=radio bind:group={layerState} value={"person"}>
            Personen
        </label>
    </div>
    <div>
        <label>
            <input type=radio bind:group={layerState} value={"heatmap"}>
            Heatmap
        </label>
    </div>

<div>
    <label>
        <input type=radio bind:group={layerState} value={"paths"}>
        Pfadmap
    </label>
</div>



</div>
