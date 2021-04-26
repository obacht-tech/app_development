<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips";

    export let indicator: boolean = true;
    let indicatorValue: number = 0


</script>

<style lang="sass">
    @import "./../theme"

    .indicator
        width: 100% !important

        input
        width: 100%
    /* Width of the outside container */

    .timeline
        position: absolute
        bottom: 6rem
        left: 1rem
        width: calc(100% - 2rem)
        font-size: $size-normal
        border-radius: $border-radius
        background: white
        box-shadow: $shadow-2xl
        padding: 1.5rem

        .rangeSlider
            margin: 0

        &__container
            position: relative

            .indicator
                margin: 0
                position: absolute
                bottom: 1rem
                width: 100%
                z-index: 3

        &__bar
            display: block
            background: $dark-grey
            width: 100%
            height: 1rem
            border-radius: $border-radius

        &__legend
            display: flex
            justify-content: space-between
            margin-top: 1rem

            > div
                position: relative

                &:before
                    display: block
                    position: absolute
                    content: ''
                    width: 2px
                    background: $dark-grey
                    height: 1.5rem
                    //left: 50%
                    bottom: 1.5rem

            &--start
                &:before
                    left: 0

            &--end
                &:before
                    right: 0

        &__marker
            position: absolute
            bottom: 1.5rem
            left: 37%
            text-align: center
            color: $blue

            &:before
                display: block
                position: absolute
                content: ''
                width: 3px
                background: $blue
                height: 2.5rem
                left: 50%
                bottom: 1.5rem

            &--icon
                position: absolute
                left: calc(50% - 15px)
                bottom: 3.7rem
                font-size: 1.8rem
                transform: rotateX(180deg)


</style>

<div class="timeline">
    <div class="timeline__container">
        {#if indicator}
            <div class="indicator__container">
                <input class="indicator" type=range min=0 max={100} value={indicatorValue}/>
            </div>
        {/if}
        <RangeSlider class="rangeSlider" hover={false} range values={[30,70]}/>
    </div>


    <!-- <div class="timeline__bar">
     </div>
     <div class="timeline__legend">
         <div class="timeline__legend&#45;&#45;start">7 Uhr</div>
         <div class="timeline__legend&#45;&#45;end">23 Uhr</div>
     </div>
     <div class="timeline__marker">
         14:27 Uhr
         <i class="fas fa-triangle timeline__marker&#45;&#45;icon"></i>
     </div>-->
</div>
