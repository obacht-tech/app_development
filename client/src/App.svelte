<script lang="ts">
    import Three from "./components/Three/Three.svelte"
    import Timeline from "./components/Timeline.svelte"
    import Controls from "./components/Controls.svelte"
    import TextCard from "./components/TextCard.svelte"
    import {cameraLocked} from "./stores/store";

    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "global"
    @import "theme"

    .scroll-snap-container
        width: 100%
        max-height: 100vh
        overflow-y: scroll
        overflow-x: hidden
        scroll-snap-type: y proximity

    .scroll-snap-child
        //  for testing only:
        // border-bottom: 1px solid grey
        // background: lightgray
        scroll-snap-align: start
        display: flex
        flex-flow: column
        justify-content: center

    .scrolling
        z-index: 1030
        width: 20%
        top: 0
        right: 0
        position: absolute

    .application
        position: relative

    header.container
        padding-top: 5rem

    footer
        margin: 5rem 0
        text-align: center

    .obacht-logo
        width: 100px
        height: auto
        margin: 0 auto .5rem
    .border
        border-top: 1px solid $dark-grey
        height: 1px
        margin: 0.3rem 0
    .subheader
        color: $dark-grey

</style>

<svelte:head>
    <link rel="shortcut icon" type="image/png" href="/client/static/obacht-human-195.png"/>
    <script src="https://kit.fontawesome.com/3a515d3a9f.js" crossorigin="anonymous"></script>
</svelte:head>

<main class="scroll-snap-container">

    <header class=" scroll-snap-child padding container">
        <h1>Corona-Studie im Herzen von Augsburg</h1>
        <h2>Abstandsmessung auf dem Rathausplatz</h2>
        <div class="border"></div>
        <p class="subheader">5 min Lesezeit</p>
    </header>

    <TextCard class="scroll-snap-child">
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>


    <section class="application scroll-snap-child">
        <Three canvasName="app0" controlsEnabled={false}/>
        <Timeline/>
        <Controls layers={false} camera={false}/>
    </section>


    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte. "
    </TextCard>

    <section class="application scroll-snap-child">
        <Three canvasName="app1" controlsEnabled={false}/>
        <Timeline/>
        <Controls layers={false} camera={false}/>
    </section>


    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>


    <section class="application scroll-snap-child">
        <Three canvasName="app2" controlsEnabled={!$cameraLocked}/>
        <Timeline/>
     <Controls layers={true} camera={true}  on:cameraLock={cameraLocked.set(!$cameraLocked)}/>

    </section>

    <footer class="scroll-snap-child">
        <picture>
            <img alt="Obacht Logo" src="/client/static/obacht-logo.svg" class="obacht-logo">
        </picture>
        &copy; 2021
    </footer>
</main>
