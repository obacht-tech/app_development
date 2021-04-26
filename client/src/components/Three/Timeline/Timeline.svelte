<script lang="ts">

    export let datasetStart: Date;
    export let datasetEnd: Date;
    export let markerStart: Date;
    export let markerNow: Date;
    export let markerEnd: Date;

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

            >div
                position: relative

                &:before
                    display: block
                    position: absolute
                    content: ''
                    width: 3px
                    background: $dark-grey
                    height: 1rem
                    bottom: 1.75rem

            &--start
                &:before
                    left: 0

            &--end
                &:before
                    right: 0

        &__marker
            position: absolute
            bottom: 1rem
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
                bottom: 1.75rem

            &--icon
                position: absolute
                left: calc(50% - 0.7rem)
                bottom: 3rem
                font-size: 2.5rem

</style>

<div class="timeline container">
    <div class="timeline__bar">
    </div>
    <div class="timeline__legend">
        <div class="timeline__legend--start">{datasetStart.getHours() + ":" + datasetStart.getMinutes()} Uhr</div>
        <div class="timeline__legend--end">{datasetEnd.getHours() + ":" + datasetEnd.getMinutes()} Uhr</div>
    </div>
    <div class="timeline__marker">
        14:27 Uhr
        <i class="fas fa-caret-down  timeline__marker--icon"></i>
    </div>
</div>
