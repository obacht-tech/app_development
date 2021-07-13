<script lang="ts">
    /**
     * Timeline Component
     * Developers: Silvia Tosato and Valentin Rogg
     */
    import TextCard from "./components/Story/TextCard.svelte";
    import Header from "./components/Story/Header.svelte";
    import Footer from "./components/Story/Footer.svelte";
    import Three from "./components/Three/Three.svelte";
    import {positionData, positionSplines} from "./store";
    import {initSplines} from "./components/Three/Layers/person";
    import type {PersonSpline} from "./types";

    /**
     * fetch Position-Data of Backend
     */
    fetch("/positions")
            .then(res => res.json())
            .then(json => {
                positionData.set(json);
                const peoplePositions: PersonSpline[] = initSplines(json.data);
                positionSplines.set(peoplePositions);
            });

</script>

<style global lang="sass">
    @import "./styles/global"
    @import "./styles/reset"
    @import "./styles/theme"
    @import "./styles/scroll-snapping"
    @import "./styles/timeline"

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
<Header scrollSnapChild/>

<main>
    <Three aid="person" scrollSnapChild/>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <Three aid="heatmap" scrollSnapChild/>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>
    <Three aid="paths" scrollSnapChild/>

    <TextCard>
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

    <Three aid="full" scrollSnapChild/>

</main>

<Footer scrollSnapChild/>
</body>
