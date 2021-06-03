<script lang="ts">
    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment from "./environment";
    import {
        markerNowSeconds,
        markerStartEndSeconds, playbackState, positionSplines
    } from "../../store";
    import type {ApplicationID, CanvasID, PersonSpline, PlaybackState} from "../../types";
    import {generatePeopleMeshes, updatePositions} from "./Layers/person";
    import {generateHeatmap, rangeHeatmap} from "./Layers/heatmap";
    import {generatePaths, rangePaths} from "./Layers/paths";


    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;

    const scene = new THREE.Scene();

    let people = new THREE.Group();
    let paths = new THREE.Group();
    let heatmap = new THREE.Object3D();

    let sizes: { width, height };

    let fullSeconds = 0;
    let speed = 1;

    positionSplines.subscribe(( data: PersonSpline[] ) => {
        if (data) {
            people = generatePeopleMeshes(data)
            scene.add(people)
            switch (aid) {
                case "heatmap":
                    heatmap = generateHeatmap(data);
                    scene.add(heatmap)
                    break;
                case "paths":
                    paths = generatePaths(data);
                    scene.add(paths);
                    break;
                case "person":
                    break;
                case "full":
                    paths = generatePaths(data);
                    scene.add(paths);
                    break
            }
        }
    })

    markerNowSeconds.subscribe(data => {
        if (data) {
            console.log(data)
            fullSeconds = data;
        }
    })

    markerStartEndSeconds.subscribe((data: { startValue: number, endValue: number }) => {
        if (data.startValue && data.endValue) {
            rangePaths(paths, data.startValue, data.endValue);
            rangeHeatmap(data.startValue, data.endValue, $positionSplines, heatmap);
        }
    })

    playbackState.subscribe((value: PlaybackState)=>{
        if(value==='play'){
            speed = 1;
        }else if(value==='2x forward'){
            speed = 0.5;
        }else if(value === 'stop'){
            speed = 0;
        }else{
            speed = 1;
        }
    })


    onMount(async () => {
        const section: HTMLElement = document.querySelector(`section#${aid}`)
        const canvas: HTMLCanvasElement = document.querySelector(`canvas#${cid}`);

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
        const camera = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 100);

        switch (aid) {
            case "full":
                camera.position.x = 15;
                camera.position.y = 10;
                camera.position.z = 10;
                break;
            default:
                camera.position.y = 10;
        }

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        scene.background = new THREE.Color(`white`);
        const env = environment();
        scene.add(env);

        const controls = new OrbitControls(camera, canvas);
        controls.enabled = enableCameraControls;
        controls.enableZoom = !cameraZoomLocked;
        controls.enableDamping = true;
        controls.minZoom = 0.8;
        controls.maxZoom = 4;
        controls.maxPolarAngle = (Math.PI / 2) * 0.99;

        window.addEventListener('resize', () => {
            sizes = {
                width: width(),
                height: section.clientHeight
            };

            camera.left = -5 * (sizes.width / sizes.height);
            camera.right = 5 * (sizes.width / sizes.height);
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderOnce();
        })

        /**
         * Animate
         */
        let elapsedSeconds = 0;
        function render(timeStamp?) {
            if(timeStamp){
                let timeInSecond = timeStamp / 1000;
                if ((aid === 'person' || aid === 'full') && speed != 0) {
                    let relativeTime = timeInSecond - Math.floor(timeInSecond);
                    if(elapsedSeconds !== Math.floor(timeInSecond)){
                        elapsedSeconds ++;
                        fullSeconds++;
                    }
                    updatePositions(fullSeconds + relativeTime, fullSeconds, people)
                }

            }
            window.requestAnimationFrame(render);
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

{#if aid==='heatmap'}
<div style="height: 1000px; width: 1000px; display: none " class="heatmap" ></div>
    {/if}
<canvas id={cid} class:cursor={enableCameraControls}></canvas>
