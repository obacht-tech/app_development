<script lang="ts">
    // import Three from "./fcomponents/Three/Three.svelte"
    // import Timeline from "./components/Timeline.svelte"
    // import Controls from "./components/Controls.svelte"
    import TextCard from "./components/TextCard.svelte";
    import {cameraLocked} from "./store";
    import Header from "./components/Story/Header.svelte";
    import Footer from "./components/Story/Footer.svelte";
    import Application from "./components/Application.svelte";
</script>

<style global lang="sass">
    @import "./styles/global"
    @import "./styles/theme"
    @import "./styles/scroll-snapping"

    .application
        position: relative

    footer
        margin: 5rem 0
        text-align: center
</style>

<svelte:head>
    <link rel="shortcut icon" type="image/png" href="/client/static/obacht-human-195.png"/>
</svelte:head>

<body class="scroll-snap-container">
    <div class="scroll-snap-child"></div>
    <Header scrollSnapChild />

    <main>

        <Application aid="person" scrollSnapChild />

        <TextCard>
            Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
            leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
            zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
            Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
            neuen Arbeitslosen im Viertel herankarrte.
        </TextCard>

        <Application aid="heatmap" scrollSnapChild />

<!--        <section class="application scroll-snap-child">-->
<!--            <Three canvasName="app0" controlsEnabled={false}/>-->
<!--            <Timeline/>-->
<!--            <Controls layers={false} camera={false}/>-->
<!--        </section>-->


<!--        <section class="application scroll-snap-child">-->
<!--            <Three canvasName="app1" controlsEnabled={false}/>-->
<!--            <Timeline/>-->
<!--            <Controls layers={false} camera={false}/>-->
<!--        </section>-->


<!--        <section class="application scroll-snap-child">-->
<!--            <Three canvasName="app2" controlsEnabled={!$cameraLocked}/>-->
<!--            <Timeline/>-->
<!--         <Controls layers={true} camera={true}  on:cameraLock={cameraLocked.set(!$cameraLocked)}/>-->
<!--        </section>-->
    </main>

    <Footer scrollSnapChild />
</body>
