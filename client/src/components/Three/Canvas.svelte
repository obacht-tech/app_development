<script lang="ts">
    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment from "./environment";
    import {positions} from "../../store";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
    import type {ApplicationID, CanvasID, PositionData} from "../../types";
    import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";


    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;


    let humanMesh;
    let positionData: PositionData[] = [];
    let sizes: { width, height };

    positions.subscribe((data: { data?: PositionData[] }) => {
        if (data.data) {
            positionData = data.data;
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

        const humanMaterial = new THREE.MeshStandardMaterial({
            color: '#C7C700'
        })
        const gltfLoader = new GLTFLoader();//
        gltfLoader.load('/client/static/models/human.gltf', (gltf) => {
            const human = gltf.scene.children[0];
            human.scale.set(0.0015, 0.0015, 0.0015);
            human.position.set(0, -0.5, 0);
            human.children[0].children[0].children[0].children[0].castShadow = true;
            human.children[0].children[0].children[0].children[0].receiveShadow = true;
            human.children[0].children[0].children[0].children[0].material = humanMaterial;

            humanMesh = human;
            //scene.add(human);
        })

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        const scene = new THREE.Scene();
        scene.background = new THREE.Color(`white`);

        scene.add(environment());

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
        // People
        const people = new THREE.Group()

        function personModels(num: number) {
            if (positionData.length === 0 || !humanMesh) {
                return
            }

            people.clear();
            for (let position of positionData[num].people) {
                let person = SkeletonUtils.clone(humanMesh);
                person.position.x = position.pos[0] * 0.001
                person.position.y = -0.5
                person.position.z = position.pos[1] * 0.001
                people.add(person)
            }
        }

        scene.add(people)
        /**
         * Animate
         */
        const clock = new THREE.Clock();

        function render() {
            const elapsedTime = clock.getElapsedTime();
            if(elapsedTime % 1 != 0){
                personModels(Math.round(elapsedTime))
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

<canvas id={cid} class:cursor={enableCameraControls}></canvas>
