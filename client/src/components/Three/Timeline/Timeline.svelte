<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";
    import Playback from "../Controls/Playback.svelte";
    import {markerNowSeconds, markerStartEndSeconds, playbackState} from "../../../store";
    import {onMount} from "svelte";

    export let indicator: boolean = false;
    export let range: boolean = true;
    export let datasetStart: Date;
    export let datasetEnd: Date;
    export let markerStart: Date;
    export let markerNow: Date;
    export let markerEnd: Date;

    const diffSeconds = Math.floor(((datasetEnd - datasetStart) / 1000));
    export let playback: boolean = false;
    let indicatorValue: number = 1;
    let markerStartValue: number = 1;
    let markerEndValue: number = diffSeconds;
    let userInteraction: boolean = false;

    onMount(() => {
        if (indicator) {
            markerNowSeconds.subscribe(data => {
                if (data) {
                    indicatorValue = data;
                }
            })

            render()
        }
        if (range) {
            markerStartEndSeconds.subscribe((data: { startValue: number, endValue: number }) => {
                if (data.startValue && data.endValue) {
                    markerStart = addSeconds(datasetStart, data.startValue);
                    markerEnd = addSeconds(datasetStart, data.endValue);
                    markerStartValue = data.startValue;
                    markerEndValue = data.endValue;
                }
            })
        }
        markerStartEndSeconds.set({startValue: 0, endValue: diffSeconds})
    })

    let delta = 0.016;

    function render() {
        window.requestAnimationFrame(render);
        if ($playbackState !== 'stop') {
            if (!userInteraction) {
                indicatorValue += delta * ($playbackState === 'play' ? 1 : 5);
            }
        }
    }

    function addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
    }

    function addSeconds(date: Date, seconds: number) {
        return new Date(date.getTime() + seconds * 1000);
    }

    function formatDate(date: Date) {
        const minutes = date.getMinutes();
        return date.getHours() + ':' + ((minutes < 10) ? 0 : '') + minutes + ':' + ((date.getSeconds() < 10) ? 0 : '') + date.getSeconds() + 'Uhr'
    }

    function setMarkerStartEnd(startValue: number, endValue: number) {
        markerStartEndSeconds.set({startValue, endValue})
        markerStart = addSeconds(datasetStart, startValue);
        markerEnd = addSeconds(datasetStart, endValue);
        markerStartValue = startValue
        markerEndValue = endValue;
    }

    function setMarkerNow(nowValue: number) {
        markerNow = addSeconds(datasetStart, nowValue);
    }

    function onStopMarkerNow(nowValue: number) {
        setMarkerNow(nowValue);
        indicatorValue = nowValue;
        userInteraction = false;
        markerNowSeconds.set(indicatorValue)
    }


    markerStart = datasetStart;
    markerEnd = datasetEnd;

</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .timeline
        position: absolute
        bottom: 0.5rem
        left: 0
        right: 0
        width: calc(100% - 2rem)
        font-size: $size-normal
        border-radius: $border-radius
        background: white
        box-shadow: $shadow-2xl
        padding: 2.5rem 2.1rem 0.5rem 2.1rem


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
            <div class="indicator_slider__container" class:only={!range}>
                <RangeSlider
                        id="indicator_slider"
                        min={1}
                        max={diffSeconds}
                        values={[indicatorValue]}
                        formatter={ value => formatDate(addSeconds(datasetStart, value)) }
                        float hover={true}
                        on:stop={(value) => onStopMarkerNow(value.detail.value)}
                        on:change={(value) => {userInteraction=true;setMarkerNow(value.detail.value);}}/>
            </div>
        {/if}
        {#if range}
            <div class="range_slider__container">
                <RangeSlider
                        id="range_slider"
                        min={1}
                        max={diffSeconds}
                        pushy={true}
                        hover={true}
                        range float
                        formatter={ value => formatDate(addSeconds(datasetStart, value)) }
                        on:stop={(value) =>setMarkerStartEnd(value.detail.values[0], value.detail.values[1])}
                        values={[markerStartValue, markerEndValue]}
                        springValues={ {stiffness: 1, damping: 1 }}/>
            </div>
        {/if}
    </div>
    <div class="timeline__legend">
        <div class="timeline__legend&#45;&#45;start">{formatDate(datasetStart)}
        </div>
        {#if playback}
            <Playback/>
        {/if}
        <div class="timeline__legend&#45;&#45;end">{formatDate(datasetEnd)}</div>
    </div>
</div>
