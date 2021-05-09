<script lang="ts">
    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment from "./environment";
    import {positions} from "../../store";
    import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
    import type {ApplicationID, CanvasID, PositionData, Person} from "../../types";
    import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";


    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;

    let positionScaling = 0.001;
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

        const fbxLoader = new FBXLoader();
        fbxLoader.load('/client/static/models/human_female.fbx', function (object) {

            // mixer = new THREE.AnimationMixer( object );
            //
            // const action = mixer.clipAction( object.animations[ 0 ] );
            // action.play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.scale.set(0.002, 0.002, 0.002)
                    child.position.set(0, -0.33, 0)
                    child.material = humanMaterial
                    humanMesh = child
                }
            });
        });

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
        let nextPositions: Person[] = [];

        const people = new THREE.Group()
        function personModels(num: number) {
            if (positionData.length === 0 || !humanMesh || num>=positionData.length) {
                return
            }

            //TODO: performence
            const addedPersons: string[] = [];
            nextPositions = positionData[num+1].people;

            for (let person of positionData[num].people) {
                let findIndexPerson = people.children.findIndex((personValue) => {
                    return personValue.uuid === person.pid
                })
                if (findIndexPerson > -1) {
                    people.children[findIndexPerson].position.x = person.pos[0] * positionScaling;
                    people.children[findIndexPerson].position.z = person.pos[1] * positionScaling;
                } else {
                    //random color
                    const personMesh = SkeletonUtils.clone(humanMesh);
                    const personMaterial = new THREE.MeshStandardMaterial({
                        color:'#'+(Math.random()*0xFFFFFF<<0).toString(16)
                    })
                    personMesh.position.x = person.pos[0] * positionScaling;
                    personMesh.position.z = person.pos[1] * positionScaling;
                    personMesh.uuid = person.pid;
                    personMesh.material = personMaterial;

                    people.add(personMesh)
                }
                addedPersons.push(person.pid);
                    const nextPositionIndex = nextPositions.findIndex((el)=>{
                        return person.pid === el.pid;
                    })
                    if(nextPositionIndex>-1){
                        const deltaX = (nextPositions[nextPositionIndex].pos[0] - person.pos[0])
                        const deltaZ = (nextPositions[nextPositionIndex].pos[1] - person.pos[1])
                         nextPositions[nextPositionIndex].deltaNext = [deltaX, deltaZ]
                    }
            }

            for (let person of people.children) {
                let findIndexPerson = addedPersons.findIndex((personId) => {
                    return personId === person.uuid
                })
                if (findIndexPerson === -1) {
                    people.remove(person)
                }
            }
        }


        scene.add(people)

        function updatePositions(time){
            // scene people
            for (let person of people.children) {

                const nextPositionIndex = nextPositions.findIndex((el)=>{
                    return person.uuid === el.pid;
                })
                if(nextPositionIndex>-1){
                    const deltaPositionX = nextPositions[nextPositionIndex].pos[0]*positionScaling - person.position.x;
                    const deltaPositionZ = nextPositions[nextPositionIndex].pos[1]*positionScaling - person.position.z;
                    person.position.x += (nextPositions[nextPositionIndex].deltaNext[0]*positionScaling)/60
                    person.position.z += nextPositions[nextPositionIndex].deltaNext[1]*positionScaling/60
                }


            }
        }
        /**
         * Animate
         */
        const clock = new THREE.Clock();


        let last = 0;
        let num = 0;
        let speed = 1;
        function render(timeStamp?) {
            let timeInSecond = timeStamp / 1000;

            if (timeInSecond - last >= speed) {
                last = timeInSecond;
                personModels(num)
                ++num

            }
            updatePositions(timeInSecond)

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
