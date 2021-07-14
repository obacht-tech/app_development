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

    <TextCard>
        Wie sich Personen im öffentlichen Raum bewegen, ist insbesondere im Bezug auf die aktuelle Corona Situation
        wichtig, um entsprechende Schutzmaßnahmen vornehmen und Entscheidungen zur Eindämmung des Virus fällen zu
        können. Im Rahmen dieser Webanwendung wird mithilfe von in Echtzeit generierter Datenvisualisierung geklärt,
        wie sich
        Personen unter Abstandsregelungen verhalten. Die Positionsdaten von Personen, die hierfür verwendet werden,
        stammen vom Team Theia und wurden am 06.07.20 im Schaezlerpalais in Augsburg aufgenommen.
    </TextCard>

    <Three aid="person" scrollSnapChild/>

    <TextCard>
        Wo halten sich die meisten Menschen auf?
        In der Heatmap wird deutlich, dass sich die Personen an den Ausstellungsobjekten bewegt haben und dort auch die
        meisten Menschen aufeinander trafen. Mit dem Regler kann reguliert werden, welche Zeitspanne die Heatmap für die
        internen Berechnung verwenden soll. Damit kann zum Beispiel auch nur eine Zeitspanne von einer halben Stunde
        betrachtet werden.


    </TextCard>

    <Three aid="heatmap" scrollSnapChild/>

    <TextCard>
        Wie bewegen sich die Personen unter Abstandsregelungen im Raum?
        In der Pfadmap zeigt sich, dass sich die meisten Menschen an den Wänden entlang bewegt haben. Mit dem Regler
        können weniger Pfade angezeigt werden, um besser erkennen zu können wie sich eine gewisse Person in der
        angegeben Zeitspanne bewegt hat.

    </TextCard>
    <Three aid="paths" scrollSnapChild/>
    <TextCard>
        Von wie vielen Personen wurde der Mindestabstand eingehalten?

        Bei der Betrachtung der Messdaten-Visualisierung fällt auf, dass die Personen durchgängig aktiv sind, da es kaum
        Zeiten ohne Personen im Raum gibt. Dabei wird ein Abstand von X Metern nicht immer eingehalten. Vor allem um
        15:15 Uhr, in der Stoßzeit, werden die Mindestabstände von den Personen kaum beachtet. Durch die
        Abstandsberechnung wird deutlich, dass der Abstand von X Metern im gesamten Zeitraum nur von X eingehalten
        wurde.

        In dieser letzten Visualisierung befinden sich ein Zoom-Icon, ein Ebenen-Icon und ein Einstellungen-Icon. Das
        Zoomen in der Szene kann mit dem Lupen-Icon aktiviert und deaktiviert werden. Beim Betätigen des Ebenen-Buttons
        öffnet sich ein Modal, das es möglich macht zwischen einer zusätzlichen Heatmap oder Pfadmap in der Szene
        auszuwählen. In den Einstellungen kann der Mindestabstand nach Belieben reguliert werden. Demnach verändert sich
        der Prozentsatz der besagt, wie viele Personen ihren Abstand von X eingehalten haben. Die Berechnung der
        Einhaltung der Abstände bezieht sich hier nur auf den Datensatz, der am 06.07.20 im Schaezlerpalais im Raum 304
        aufgenommen wurde.

    </TextCard>

    <Three aid="full" scrollSnapChild/>

</main>

<Footer scrollSnapChild/>
</body>
