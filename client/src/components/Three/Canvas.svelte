<script lang="ts">
    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
    import environment from "./environment";
    import {positions} from "../../store";
    import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';
    import type {ApplicationID, CanvasID, PositionData, Person, PersonSpline} from "../../types";
    import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";


    export let aid: ApplicationID;
    export let cid: CanvasID;
    export let inFrame: boolean;
    export let enableCameraControls: boolean = false;
    export let cameraZoomLocked: boolean = true;

    let positionScaling = 0.01;
    let humanMesh;
    let fetchingData: PositionData[] = [];
    let positionSplines: PersonSpline[];
    let sizes: { width, height };

    positions.subscribe((data: { data?: PositionData[] }) => {
        if (data.data) {
            fetchingData = data.data;
           positionSplines = initSplines()
        }
    })

    function initSplines(): PersonSpline[] {
        const peopleSplines: PersonSpline[] = []
        for (let i = 0; i < fetchingData.length; i++) {

            for (let person of fetchingData[i].people) {
                const foundPersonIndex = peopleSplines.findIndex((personSpline) => {
                    return personSpline.pid === person.pid;
                })

                if (foundPersonIndex > -1) {
                    peopleSplines[foundPersonIndex].splineData.push( new THREE.Vector2( person.pos[0],  person.pos[1]))

                }else{

                    const newPerson = {
                        pid: person.pid,
                        splineData: [new THREE.Vector2( person.pos[0],  person.pos[1])],
                        startDate: fetchingData[i].date,
                        timePosition: i

                    }
                    peopleSplines.push(newPerson)
                }

            }
        }

        for (let personSpline of peopleSplines){
            personSpline.spline = new THREE.SplineCurve(personSpline.splineData);
           personSpline.timeDelta = personSpline.splineData.length-1;
            generatePersonMesh(personSpline)
        }

        return peopleSplines;
    }

    const people = new THREE.Group()

    function generatePersonMesh(person: PersonSpline){
        const personMesh = SkeletonUtils.clone(humanMesh);
        const personMaterial = new THREE.MeshStandardMaterial({
            color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
        })
        personMesh.visible = false
        personMesh.position.x = Math.random();
        personMesh.position.z = 0;
        personMesh.uuid = person.pid;
        personMesh.material = personMaterial;
        personMesh.spline = person.spline;
        personMesh.timePosition = person.timePosition;
        personMesh.timeDelta = person.timeDelta;
        people.add(personMesh)
    }


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

        // const path = new THREE.Path();
        //
        // path.lineTo(0, 0.8);
        // path.quadraticCurveTo(0, 1, 0.2, 1);
        // path.lineTo(1, 1);
        //
        // const points = path.getPoints();
        //
        // const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // const material = new THREE.LineBasicMaterial({color: 0xffffff});
        //
        // const line = new THREE.Line(geometry, material);
        // scene.add(line);



        // Create a sine-like wave
        const curve = new THREE.SplineCurve( [
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),
        ] );

        const curve2 = new THREE.SplineCurve( [
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -5, 5 ),

        ] );

       // const points = curve.getPoints( 50 );
        console.log(curve.getLength())
        //console.log(curve2.arcLengthDivisions)
       // const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
      //  const splineObject = new THREE.Line( geometry, material );


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





        function personModels(num: number) {
            if (fetchingData.length === 0 || !humanMesh || num >= fetchingData.length) {
                return
            }

            //TODO: performence
            const addedPersons: string[] = [];
            nextPositions = fetchingData[num + 1].people;

            for (let person of fetchingData[num].people) {
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
                        color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
                    })
                    personMesh.position.x = person.pos[0] * positionScaling;
                    personMesh.position.z = person.pos[1] * positionScaling;
                    personMesh.uuid = person.pid;
                    personMesh.material = personMaterial;

                    people.add(personMesh)
                }
                addedPersons.push(person.pid);
                const nextPositionIndex = nextPositions.findIndex((el) => {
                    return person.pid === el.pid;
                })
                if (nextPositionIndex > -1) {
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


        function updatePositions(time, second) {
            // scene people
            /*for (let person of people.children) {

                const nextPositionIndex = nextPositions.findIndex((el) => {
                    return person.uuid === el.pid;
                })
                if (nextPositionIndex > -1) {
                    const deltaPositionX = nextPositions[nextPositionIndex].pos[0] * positionScaling - person.position.x;
                    const deltaPositionZ = nextPositions[nextPositionIndex].pos[1] * positionScaling - person.position.z;
                    person.position.x += (nextPositions[nextPositionIndex].deltaNext[0] * positionScaling) / 60
                    person.position.z += nextPositions[nextPositionIndex].deltaNext[1] * positionScaling / 60
                }


            }*/

            for (let person of people.children){
                const moment = time - person.timePosition; // 1.2 sek
                if(person.timePosition <= second && moment <=  person.timeDelta ){
                    if(!person.visible){
                        person.visible = true;
                    }


                    const deltaTimePosition = person.timeDelta; //diffrenz ende-starttime



                    const pos =  person.spline.getPoint((moment*100/deltaTimePosition)*0.01);

                   person.position.x =pos.x*positionScaling
                    person.position.z = pos.y*positionScaling


                }else{
                    if(person.visible){
                        person.visible = false
                    }
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
        let elapsedTime = 0;
        let t = 0
        function render(timeStamp?) {
            let timeInSecond = timeStamp / 1000;
           // elapsedTime = clock.getElapsedTime()
            if (timeInSecond - last >= speed) {
                last = timeInSecond;

                // personModels(num)
                ++num

            }

            //console.log(timeInSecond)

            updatePositions(timeInSecond,num)
t+=0.000016
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
