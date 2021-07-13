<script lang="ts">
    /**
     * Canvas Component
     * Developers: Silvia Tosato and Valentin Rogg
     */

    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment from "./environment";
    import {
        layerState,
        markerNowSeconds,
        markerStartEndSeconds, playbackState, positionSplines, distance
    } from "../../store";
    import type {ApplicationID, CanvasID, LayerState, PersonSpline} from "../../types";
    import {
        generatePeopleWithAnimations,
        updatePositions
    } from "./Layers/person";
    import {generateHeatmap, updateHeatmap} from "./Layers/heatmap";
    import {generatePaths, updatePaths} from "./Layers/paths";
    import {generateCollisionCircles} from "./Layers/collision";
    import {updateDistances} from "./Layers/infection";
    import Information from "./Information/Information.svelte";
    import datasetDates from "../../env";

    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;

    const scene = new THREE.Scene();

    let people: THREE.Group = new THREE.Group();
    let paths = new THREE.Group();
    let collisionCircles = new THREE.Group();
    let heatmap = new THREE.Object3D();

    let sizes: { width, height };
    let elapsedTime = 0;
    let collidingPeople;

    let diffSeconds = Math.floor(((datasetDates.end - datasetDates.start) / 1000))

    /**
     * Subscription to Data
     */
    positionSplines.subscribe(async (data: PersonSpline[]) => {
        if (data) {
            switch (aid) {
                case "person":
                    people = await generatePeopleWithAnimations(data)
                    scene.add(people)
                    collisionCircles = generateCollisionCircles(data);
                    scene.add(collisionCircles)
                    break;
                case "heatmap":
                    heatmap = generateHeatmap(data, aid);
                    scene.add(heatmap)
                    break;
                case "paths":
                    people = await generatePeopleWithAnimations(data)
                    scene.add(people)
                    paths = generatePaths(data);
                    scene.add(paths);
                    break;
                case "full":
                    people = await generatePeopleWithAnimations(data)
                    scene.add(people)
                    paths = generatePaths(data);
                    paths.visible = false;
                    collisionCircles = generateCollisionCircles(data);
                    scene.add(collisionCircles);
                    heatmap = generateHeatmap(data, aid);
                    heatmap.visible = false;
                    scene.add(paths, heatmap)
                    collidingPeople = updateDistances($positionSplines, $distance.new, 0, diffSeconds)
                    break
            }
        }
    })

    /**
     * Subscription to Time Slider
     */
    markerNowSeconds.subscribe(data => {
        if (data) {
            elapsedTime = data;
        }
    })

    /**
     * Subscription to Range Slider
     */
    markerStartEndSeconds.subscribe((data: { startValue: number, endValue: number }) => {
        if (data.startValue && data.endValue) {
            if (aid === 'paths' || aid === 'full') {
                updatePaths(paths, data.startValue, data.endValue);
            }
            if (aid === 'heatmap' || aid === 'full') {
                updateHeatmap(data.startValue, data.endValue, $positionSplines, aid, heatmap);
            }
        }
    })

    /**
     * Subscription Layers and Distance
     */
    if (aid === 'full') {
        layerState.subscribe((data: LayerState) => {
            switch (data) {
                case "heatmap":
                    heatmap.visible = true;
                    paths.visible = false;
                    break;
                case "paths":
                    heatmap.visible = false;
                    paths.visible = true;
                    break;
                case "person":
                    heatmap.visible = false;
                    paths.visible = false;
                    break;
            }
        })

        distance.subscribe(value => {
            if (people.children.length > 0) {
                collidingPeople = updateDistances($positionSplines, value.new, 0, diffSeconds )
            }
        });

    }

    onMount(async () => {
        const section: HTMLElement = document.querySelector(`section#${aid}`)
        const canvas: HTMLCanvasElement = document.querySelector(`canvas#${cid}`);

        /**
         * Canvas centering
         */
        const width = (): number => {
            return section.clientWidth
                    - parseInt(window.getComputedStyle(section, null).getPropertyValue('padding-left'))
                    - parseInt(window.getComputedStyle(section, null).getPropertyValue('padding-right'));
        }

        sizes = {
            width: width(),
            height: section.clientHeight
        };

        const aspectRatio = sizes.width / sizes.height;
        const zoomingFactor = 8;

        /**
         * TopDownCamera or OrbitCamera
         **/
        const camera = new THREE.OrthographicCamera(-zoomingFactor * aspectRatio, zoomingFactor * aspectRatio, zoomingFactor, -zoomingFactor, 0.1, 100);

        switch (aid) {
            case "full":
                camera.position.x = 15;
                camera.position.y = 10;
                camera.position.z = 10;

                break;
            default:
                camera.position.y = 10;
                break;
        }
        /**
         * Renderer Initialisation
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        /**
         * Environment
         **/
        scene.background = new THREE.Color(`white`);
        const env = environment();
        scene.add(env);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, canvas);
        controls.enabled = enableCameraControls;
        controls.enableZoom = !cameraZoomLocked;
        controls.enableDamping = true;
        controls.minZoom = 0.8;
        controls.maxZoom = 4;
        controls.maxPolarAngle = (Math.PI / 2) * 0.99;

        /**
         * EventListener Resize Window
         */
        window.addEventListener('resize', () => {
            sizes = {
                width: width(),
                height: section.clientHeight
            };

            camera.left = -zoomingFactor * (sizes.width / sizes.height);
            camera.right = zoomingFactor * (sizes.width / sizes.height);
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderOnce();
        })

        /**
         * Render
         */
        let delta = 0.016;
        function render() {
            window.requestAnimationFrame(render);
            if ($playbackState !== 'stop') {
                elapsedTime += delta * ($playbackState === 'play' ? 1 : 5);
            }
            if ((aid === 'person' || aid === 'full') && people) {
                updatePositions(elapsedTime, Math.floor(elapsedTime), people, collisionCircles, delta * ($playbackState === 'play' ? 1 : 5), $playbackState);
            }
            if (inFrame) {
                controls.enableZoom = !cameraZoomLocked;
                controls.update();
                renderer.render(scene, camera);
            }
        }

        function renderOnce() {
            renderer.render(scene, camera);
        }

        renderOnce();
        render();

    })

</script>

<style lang="sass">
    .cursor
        cursor: move
</style>

{#if aid === 'heatmap' || aid === 'full'}
    <div style="height: 1000px; width: 1000px; display: none" class={aid==='heatmap'?'heatmap': 'full'}></div>
{/if}

{#if aid === 'full'}
    <Information bind:collidingPeople={collidingPeople}/>
{/if}

<canvas id={cid} class:cursor={enableCameraControls}></canvas>
