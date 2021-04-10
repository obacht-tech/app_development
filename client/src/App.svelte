<script lang="ts">
    import Three from "./components/Three/Three.svelte"
    import Card from "./components/Card.svelte"
    import Timeline from "./components/Timeline.svelte"
    import Controls from "./components/Controls.svelte"
    import TextCard from "./components/TextCard.svelte"

    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "global"
    @import "theme"

    .scroll-snap-container
        flex-basis: 50%
        max-height: 100vh
        overflow-y: scroll

        scroll-snap-type: y mandatory

    .scroll-snap-child
        border-bottom: 1px solid white
        background: lightgray

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


    img
        height: 700px
        width: 100vh
        overflow-x: hidden

    header.container
        padding-top: 5rem


    footer
        margin: 5rem 0
        text-align: center

    .obacht-logo
        width: 100px
        height: auto
        margin: 0 auto .5rem
</style>

<svelte:head>
    <link rel="shortcut icon" type="image/png" href="/client/static/obacht-human-195.png"/>
    <script src="https://kit.fontawesome.com/3a515d3a9f.js" crossorigin="anonymous"></script>
</svelte:head>

<main>
    <div class="scroll-snap-container">
        <header class=" scroll-snap-child padding container">
            <h1>Corona-Studie im Herzen von Augsburg</h1>
            <h2>Abstandsmessung auf dem Rathausplatz</h2>
            <hr/>
            <p>5 min Lesezeit</p>
        </header>


        <div class="scroll-snap-child">
            <TextCard>
                Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
                leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
                zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
                Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
                neuen Arbeitslosen im Viertel herankarrte.
            </TextCard>
        </div>
        <div class="scroll-snap-child">
            <TextCard>
                Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
                leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
                zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
                Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
                neuen Arbeitslosen im Viertel herankarrte.
            </TextCard>
        </div>

        <div class="application scroll-snap-child">

            <Three canvasName="app0"/>
            <Timeline/>
            <Controls layers={false} camera={false}/>
        </div>

        <div class="scroll-snap-child">
            <TextCard>
                Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
                leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
                zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
                Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
                neuen Arbeitslosen im Viertel herankarrte. "
            </TextCard>
        </div>

        <div class="application scroll-snap-child">

            <Three canvasName="app1"/>
            <Timeline/>
            <Controls layers={false} camera={false}/>

        </div>
        <div class="scroll-snap-child">
            <TextCard>
                Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
                leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
                zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
                Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
                neuen Arbeitslosen im Viertel herankarrte.
            </TextCard>
        </div>

        <div class="application scroll-snap-child">
            <Three canvasName="app2" controlsEnabled={true}/>
            <Timeline/>
            <Controls layers={true} camera={true}/>
        </div>
    </div>


    <footer>
        <picture>
            <img alt="Obacht Logo" src="/client/static/obacht-logo.svg" class="obacht-logo">
        </picture>
        &copy; 2021
    </footer>
</main>
