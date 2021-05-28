<script lang="ts">
    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment, {setPlaneTexture} from "./environment";
    import {
        positions,
        markerNowSeconds,
        markerStartEndSeconds
    } from "../../store";
    import type {ApplicationID, CanvasID, PositionData} from "../../types";
    import {generatePeopleMeshes, initSplines, updatePositions} from "./Layers/person";
    import {initHeatmap} from "./Layers/heatmap";
    import {generatePaths, rangePaths} from "./Layers/paths";


    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;

    const scene = new THREE.Scene();

    let people = new THREE.Group();
    let paths = new THREE.Group();
    let fetchingData: PositionData[] = [];

    let sizes: { width, height };

    let fullSeconds = 0;

    positions.subscribe((data: { data?: PositionData[] }) => {
        if (data.data) {
            fetchingData = data.data;
            const positionSplines = initSplines(fetchingData)
            people = generatePeopleMeshes(positionSplines)
            scene.add(people)
            switch (aid) {
                case "heatmap":
                    break;
                case "paths":
                    paths = generatePaths(positionSplines)
                    scene.add(paths)
                    break;
                case "person":
                    break;
                case "full":
                    paths = generatePaths(positionSplines)
                    scene.add(paths);
                    break
            }


        }
    })

    markerNowSeconds.subscribe(data => {
        if (data) {
            fullSeconds = data;
        }
    })

    markerStartEndSeconds.subscribe((data: { startValue: number, endValue: number }) => {
        if (data.startValue && data.endValue) {
            rangePaths(paths, data.startValue, data.endValue)
        }
    })


    onMount(async () => {
initHeatmap();
        const heatmapCanvas: HTMLCanvasElement = document.querySelector('canvas.heatmap-canvas')
        const heatMapTexture: THREE.CanvasTexture = new THREE.CanvasTexture(heatmapCanvas);

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
        setPlaneTexture(heatMapTexture)
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
        let last = 0;
        let elapsedSeconds = 0;
        let speed = 1;

        function render(timeStamp?) {
            let timeInSecond = timeStamp / 1000;
            if (timeInSecond - last >= speed) {
                last = timeInSecond;
                ++elapsedSeconds;
                ++fullSeconds
            }
            let relativeTime = timeInSecond - elapsedSeconds; //0,231 sek
            if (aid === 'person' || aid === 'full') {
                updatePositions(fullSeconds + relativeTime, fullSeconds, people)
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


<div style="height: 300px; width: 300px; display: none" class="heatmap"></div>
<canvas id={cid} class:cursor={enableCameraControls}></canvas>
