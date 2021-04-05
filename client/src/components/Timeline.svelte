<style lang="sass">
    @import "./../theme"

    .timeline
        position: fixed
        bottom: 7rem
        left: 1rem
        width: calc(100% - 2rem - 3rem)
        font-size: $size-normal
        border-radius: $border-radius
        background: white
        box-shadow: $shadow-2xl
        padding: 1.5rem

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

<section class="timeline">
    <div class="timeline__bar">
    </div>
    <div class="timeline__legend">
        <div class="timeline__legend--start">7 Uhr</div>
        <div class="timeline__legend--end">23 Uhr</div>
    </div>
    <div class="timeline__marker">
        14:27 Uhr
        <i class="fas fa-triangle timeline__marker--icon"></i>
    </div>
</section>
