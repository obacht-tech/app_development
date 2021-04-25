<script lang="ts">
    export let scrollSnapChild: boolean = false;
</script>

<style lang="sass">
    @import "./../../styles/scroll-snapping"
    @import "./../../styles/theme"


    header
        margin: 5rem auto 0

    h1
        font-size: 4rem
        line-height: 1em
        font-family: 'IBM Plex Serif', sans-serif
        font-weight: 400

    h2
        font-size: 1.5rem
        line-height: 1em
        font-weight: 200
        color: $dark-grey
        margin: 2.5rem 0 1.5rem

    .block
        display: flex
        justify-content: space-between
        font-size: .875rem

    .links
        >*:not(:first-child)
            margin-left: .5rem

    a
        color: black
        text-decoration: none

    img
        height: 1.25rem
        width: 1.25rem

    .info
        display: flex
        align-items: center

        &__logo
            margin: 0 1rem 0 0

        &__point
            margin: 0 .255rem
            font-weight: 700
            font-size: 1rem

</style>

<header class:scroll-snap-child={scrollSnapChild} class="container">
    <h1>Verhaltensstudie im Herzen von Augsburg</h1>
    <h2>Abstandsmessung auf dem Rathausplatz</h2>
    <div class="block">
        <p class="info">
            <span class="info__logo">
                <picture>
                    <img alt="Obacht Logo" src="/client/static/obacht-human.svg">
                </picture>
            </span>
            <span class="info__release">15 Juli 2021</span>
            <span class="info__point">·</span>
            <span class="info__read_time">5 min lesen</span>
        </p>
        <p class="links">
            <i class="fal fa-share-square" style="cursor: pointer"></i>
            <a href="https://www.linkedin.com/company/69704526/"><i class="fab fa-linkedin-in"></i></a>
        </p>
    </div>
</header>
