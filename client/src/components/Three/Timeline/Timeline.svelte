<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";

    export let indicator: boolean = true;
    export let datasetStart: Date;
    export let datasetEnd: Date;
    export let markerStart: Date;
    export let markerNow: Date;
    export let markerEnd: Date;


    const diffMinutes = Math.floor(((datasetEnd - datasetStart) / 1000) / 60);

    function addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function formatDate(date: Date) {
        const minutes = date.getMinutes();
        return date.getHours() + ':' + ((minutes < 10) ? 0 : '') + minutes + 'Uhr'
    }

    function setMarkerStartEnd(startValue: number, endValue: number) {
        markerStart = addMinutes(datasetStart, startValue);
        markerEnd = addMinutes(datasetStart, endValue);
    }

    function setMarkerNow(nowValue: number) {
        markerNow = addMinutes(datasetStart, nowValue);
    }


    markerStart = datasetStart;
    markerEnd = datasetEnd;

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
        padding: 2.5rem 1.5rem 0.5rem 1.5rem


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

        .range_slider__container
            --range-float-text: $dark-grey

        .indicator_slider__container
            --range-float-text: #18A0FB

</style>

<div class="timeline container">
    <div class="timeline__container">
        {#if indicator}
            <div class="indicator_slider__container">
                <RangeSlider
                        id="indicator_slider"
                        min={0}
                        max={diffMinutes}
                        formatter={ value => formatDate(addMinutes(datasetStart, value)) }
                        float hover={false}
                        on:stop={(value) => setMarkerNow(value.detail.value)}/>
            </div>
        {/if}
        <div class="range_slider__container">
            <RangeSlider
                    id="range_slider"
                    min={0}
                    max={diffMinutes}
                    pushy={true}
                    hover={false}
                    range float
                    formatter={ value => formatDate(addMinutes(datasetStart, value)) }
                    on:stop={(value) =>setMarkerStartEnd(value.detail.values[0], value.detail.values[1])}
                    values={[0, diffMinutes]}/>
        </div>
    </div>
    <div class="timeline__legend">
        <div class="timeline__legend&#45;&#45;start">{formatDate(datasetStart)}
        </div>
        <div class="timeline__legend&#45;&#45;end">{formatDate(datasetEnd)}</div>
    </div>
</div>
