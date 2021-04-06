<script lang="ts">
    import Three from "./components/Three/Three.svelte"
    import Card from "./components/Card.svelte"
    import Timeline from "./components/Timeline.svelte"
    import Controls from "./components/Controls.svelte"
    import TextCard from "./components/TextCard.svelte"

    console.log("Hello from Svelte!")
</script>

<style global lang="sass">
    @import "theme"
    //@import "global"

    html, body
        margin: 0
        padding: 0
        overflow-x: hidden

    main
        font-family: "IBM Plex Sans", sans-serif
        width: 100%
        height: 100%
        display: block


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

</style>

<svelte:head>
    <link rel="shortcut icon" type="image/png" href="/client/static/obacht-human-195.png"/>
    <script src="https://kit.fontawesome.com/3a515d3a9f.js" crossorigin="anonymous"></script>
</svelte:head>

<main>

    <header class="container">
        <h1>Corona-Studie im Herzen von Augsburg</h1>
        <h2>Abstandsmessung auf dem Rathausplatz</h2>
    </header>


    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut, zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war. Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut, zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war. Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <div class="application">
        <img src="/client/static/Heatmap.png" alt="heatmap">
        <Timeline/>
        <Controls layers={false} camera={false}/>
    </div>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut, zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war. Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen neuen Arbeitslosen im Viertel herankarrte. "
    </TextCard>

    <div class="application">
        <img src="/client/static/Pfadmap.png" alt="Pfadmap">
        <Timeline/>
        <Controls layers={false} camera={false}/>
    </div>

    <TextCard>
        Vor einem Jahr ließ sich unser Leben in New York am besten als apokalyptisch beschreiben. Durch die leeren Straßenzüge hallten die Sirenen der Ambulanzen im Fünfminutentakt. Vor dem Beerdigungsinstitut, zwei Blocks von unserem Haus entfernt, parkte ein Kühlwagen, weil die Leichenhalle dort überfüllt war. Die pakistanische Gemeinde organisierte den Hunger Truck, einen Minivan, der Lebensmittel für die vielen neuen Arbeitslosen im Viertel herankarrte.
    </TextCard>

    <div class="application">
        <Three/>
        <Timeline/>
        <Controls layers={true} camera={true}/>
    </div>
    <!--    <Card bottom={false} right={false}>-->
    <!--        Got Feedback?-->
    <!--        <br/>-->
    <!--        Contact <div class="badge"> <a href="mailto:mail@valentinrogg.de" id="creator">@ValentinRogg</a> </div>-->
    <!--        <img width="128" src="/client/static/obacht-logo.svg">-->
    <!--    </Card>-->
    <!--    <section class="scrolling">-->
    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad adipisci dolore dolorum exercitationem harum, iste iure laboriosam nobis quidem!-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi consequatur consequuntur dicta esse et explicabo placeat, quidem sequi voluptatem voluptates?-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad adipisci dolore dolorum exercitationem harum, iste iure laboriosam nobis quidem!-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi consequatur consequuntur dicta esse et explicabo placeat, quidem sequi voluptatem voluptates?-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->

    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad adipisci dolore dolorum exercitationem harum, iste iure laboriosam nobis quidem!-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <p>-->
    <!--            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi consequatur consequuntur dicta esse et explicabo placeat, quidem sequi voluptatem voluptates?-->
    <!--        </p>-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--        <br />-->
    <!--    </section>-->
</main>
