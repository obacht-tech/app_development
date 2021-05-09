<script lang="ts">
    import TextCard from "./components/Story/TextCard.svelte";
    import Header from "./components/Story/Header.svelte";
    import Footer from "./components/Story/Footer.svelte";
    import Three from "./components/Three/Three.svelte";
    import {positions, time} from "./store";
    import {onMount} from 'svelte';

    onMount(() => {
        const interval = setInterval(() => {
            time.update(n => n + 1)
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });

    fetch("/positions")
            .then(res => res.json())
            .then(json => positions.set(json));

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

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die
        leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut,
        zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war.
        Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen
        neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <Three scrollSnapChild/>

</main>

<Footer scrollSnapChild/>
</body>
