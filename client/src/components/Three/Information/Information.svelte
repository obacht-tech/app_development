<script lang="ts">
    /**
     * Information Component
     * Developer: Silvia Tosato
     */
    import {
        maskWear,
        incidence,
        distance,
        positionSplines
    } from "../../../store";

    export let collidingPeople: number = 1;

    /**
     * returns percentage of not collidingPeople
     *
     * @param {PlaybackState} state
     * return number
     */
    function notCollidingPeoplePercentage(collidingPeopleLength: number, allPeopleLength: number): number {
        return (allPeopleLength * (allPeopleLength - collidingPeopleLength)) / 100
    }
</script>

<style lang="sass">
    @import "./../../../styles/theme"

    .information
        position: absolute
        top: clamp(1rem, 10vw, 5rem)
        width: 100%

        .container-flex
            display: flex
            justify-content: space-evenly
            align-items: center

            .right-side
                max-width: 50%
                text-align: center

                p
                    margin: 0.5rem 0 0 0
                    font-weight: normal
                    font-size: 1rem

        h3
             background: $light-grey


</style>

<div class="information">
    <div class="container-flex">
       <!--  <div class="left-side">
            <p>Mindestabstand: {$distance.new}m</p>
            <p>Maskentragende: {$maskWear.new}%</p>
            <p>Inzidenz: {$incidence.new}/100tsd</p>
        </div> -->
        <div class="right-side">
            <h3>{notCollidingPeoplePercentage(collidingPeople, $positionSplines ? $positionSplines.length : 1)}%</h3>
            <p>halten den Mindestabstand von {$distance.new}m ein*</p>
        </div>
    </div>


</div>
