<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import {spring} from "svelte/motion";

    export let springValues = {stiffness: 0.15, damping: 0.4};
    export let indicator: boolean = true;
    export let indicatorValue: number = 0
    export let datasetStart: Date;
    export let datasetEnd: Date;
    export let markerStart: Date;
    export let markerNow: Date;
    export let markerEnd: Date;


    let indicatorSpring = spring({value: 0}, {
        stiffness: 0.4, damping: 0.7
    });

    const num = new Intl.NumberFormat("en-US");

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .timeline
        position: absolute
        bottom: 6.5rem
        left: 0
        right: 0
        width: calc(100% - 2rem)
        font-size: $size-normal
        border-radius: $border-radius
        background: white
        box-shadow: $shadow-2xl
        padding: 1.5rem 1.5rem 1rem 1.5rem

        &__container
            position: relative


        &__legend
            display: flex
            justify-content: space-between
            margin-top: 1rem



            &--start
                &:before
                    left: 0

            &--end
                &:before
                    right: 0



</style>

<div class="timeline container">

    <div class="timeline__container">
        {#if indicator}
            <div >
                <RangeSlider id="indicator_slider" formatter={ v => num.format(v * 1000) } float  hover={false} />
            </div>

        {/if}
        <div >
            <RangeSlider  id="range_slider" pushy={true}  on:stop={(value) => console.log(value)}  hover={false} range values={[30,70]}/>
        </div>
    </div>
    <div class="timeline__legend">
        <div class="timeline__legend&#45;&#45;start">{datasetStart.getHours() + ":" + datasetStart.getMinutes()} Uhr</div>
        <div class="timeline__legend&#45;&#45;end">{datasetEnd.getHours() + ":" + datasetEnd.getMinutes()} Uhr</div>
    </div>
</div>
