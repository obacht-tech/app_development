<script lang="ts">
    import {onMount} from 'svelte';
    // import main from "./three";
    import Stats from "stats.js";
    import * as THREE from 'three';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
    import * as dat from 'dat.gui';
    import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
    import {SAOPass} from "three/examples/jsm/postprocessing/SAOPass";
    import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
    import Card from "../Card.svelte";
    import gsap from 'gsap';
    import {SMAAPass} from "three/examples/jsm/postprocessing/SMAAPass";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
    import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
    // import {SSAOPass} from "three/examples/jsm/postprocessing/SSAOPass";
    // import galaxyVertexShader from '../../shaders/galaxy/vertex.glsl'
    // import galaxyFragmentShader from '../../shaders/galaxy/fragment.glsl'



    /**
     * Component properties
     */

    export let controlsEnabled: boolean;
    export let canvasName: string = 'webgl'

    /**
     * Base
     */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    // Debug
    // const gui = new dat.GUI();

    // Stats
    const stats = new Stats();

    // Canvas
    let canvas: HTMLCanvasElement;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    /**
     * Light
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040, 4);
    directionalLight.castShadow = true;
    directionalLight.position.z = 3;
    directionalLight.position.y = 3;
    directionalLight.position.x = 2;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(directionalLightCameraHelper);

    /**
     * Material
     */
    const material = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const humanMaterial = new THREE.MeshStandardMaterial({
        color: '#C7C700',
    })

    /**
     * Plane
     */
    const planeGeometry = new THREE.CircleBufferGeometry(20, 128);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotateX(-Math.PI / 2);
    // plane.scale.set( 100, 100, 100);
    plane.position.y = -.5;

    /**
     * Cube
     */
    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1);
    const cube0 = new THREE.Mesh(cubeGeometry, material);
    cube0.castShadow = true;
    cube0.scale.set(1, 2, 3);
    cube0.position.set(-3, 0.5, 1);

    const cube1 = new THREE.Mesh(cubeGeometry, material);
    cube1.castShadow = true;
    cube1.scale.set(1, 1, 2.5);
    cube1.position.set(-2, 0, -2.5);
    cube1.rotateY(-Math.PI * 0.25);

    const cube2 = new THREE.Mesh(cubeGeometry, material);
    cube2.castShadow = true;
    cube2.scale.set(1, 2, 2.5);
    cube2.position.set(3, 0.5, -0.5);
    cube2.rotateY(Math.PI * 0.1);

    scene.add(cube0, cube1, cube2);
    scene.add(plane);

    /**
     * Models
     */
    const gltfLoader = new GLTFLoader();//
    gltfLoader.load('/client/static/models/human.gltf', (gltf) => {
        const human = gltf.scene.children[0];
        human.scale.set(0.0015, 0.0015, 0.0015);
        human.position.set(0, -0.5, 0);
        human.children[0].children[0].children[0].children[0].castShadow = true;
        human.children[0].children[0].children[0].children[0].receiveShadow = true;
        human.children[0].children[0].children[0].children[0].material = humanMaterial;
        scene.add(human);
    })

    // let mixer;
    //
    // const fbxLoader = new FBXLoader();
    // fbxLoader.load(
    //         '/client/static/models/human-walk.fbx',
    //         (fbx) => {
    //             console.log(fbx);
    //             fbx.scale.set(0.002, 0.002, 0.002);
    //             scene.add(fbx);
    //
    //             mixer = new THREE.AnimationMixer(fbx);
    //             const action = mixer.clipAction(fbx.animations[0]);
    //             action.play();
    //         }
    // )

    /**
     * Camera
     */
    // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    const aspectRatio = sizes.width / sizes.height;
    const camera = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 5, -5, 0.1, 100);
    camera.position.x = 15;
    camera.position.y = 10;
    camera.position.z = 10;
    scene.add(camera);

    let controls;
    let renderer;
    let effectComposer;

    onMount(() => {

        /**
         * Base
         */
        // Stats
        document.body.appendChild(stats.dom);

        // Canvas
        canvas = document.querySelector('canvas.' + canvasName);

        /**
         * Renderer
         */
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = controlsEnabled;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        let RenderTargetClass;

        if(renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) {
            RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
        } else {
            RenderTargetClass = THREE.WebGLRenderTarget;
        }

        const renderTarget = new RenderTargetClass(600, 800, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            // encoding: THREE.sRGBEncoding
        })

        effectComposer = new EffectComposer(renderer, renderTarget);
        effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        effectComposer.setSize(sizes.width, sizes.height);

        const renderPass = new RenderPass(scene, camera);
        effectComposer.addPass(renderPass);

        const saoPass = new SAOPass(scene, camera);
        saoPass.params.saoBias = 0.8;
        saoPass.params.saoIntensity = 0.005;
        saoPass.params.saoScale = 2;
        saoPass.params.saoKernelRadius = 100;
        saoPass.params.saoMinResolution = 0;
        saoPass.params.saoBlur = 1;
        saoPass.params.saoBlurRadius = 8;
        saoPass.params.saoBlurStdDev = 4;
        saoPass.params.saoBlurDepthCutoff = 0.01;
        // effectComposer.addPass(saoPass);

        if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
            const smaaPass = new SMAAPass(600, 800)
            effectComposer.addPass(smaaPass)
        }

        /**
         * Controls
         */
        controls = new OrbitControls(camera, canvas);
        controls.enabled = controlsEnabled;
        controls.enableDamping = true;
        controls.minZoom = 0.8;
        controls.maxZoom = 4;
        controls.maxPolarAngle = (Math.PI / 2) * 0.99;

        /**
         * Sizes
         */
        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Update camera
            camera.left = -5 * (sizes.width / sizes.height);
            camera.right = 5 * (sizes.width / sizes.height);
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Update effectComposer
            effectComposer.setSize(sizes.width, sizes.height)
            effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Animate
         */
        // const clock = new THREE.Clock();
        // let oldElapsedTime = 0;

        const tick = () => {
            stats.begin();

            // const elapsedTime = clock.getElapsedTime();
            // const deltaTime = elapsedTime - oldElapsedTime;
            // oldElapsedTime = elapsedTime;

            // Update controls
            if(controlsEnabled !== controls.enabled){
                controls.enabled = controlsEnabled
            }
            controls.update();

            // Render
            // renderer.render(scene, camera)
            effectComposer.render();


            // AnimationMixer (Not working with SAOPass)
            // if(mixer) {
            //     mixer.update(deltaTime);
            // }

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);

            stats.end();
        }

        tick();
    })


</script>

<style lang="sass">
    #three
        margin: auto
        padding: 0
        //position: absolute
        display: block
        height: 100vh
        width: 100%
        top: 0

    canvas
        display: block
        //height: 100%
        width: 100%
</style>

<section id="three">
<!--    <Card bottom={false} right={true} bg={false}>-->
<!--        <button on:click={() => {-->
<!--            controls.enableDamping = false;-->
<!--            gsap.to(camera.position,  { duration: 0.2, x: 0});-->
<!--            gsap.to(camera.position,  { duration: 0.4, y: 15, onComplete: () => {controls.enableDamping = true}});-->
<!--            gsap.to(camera.position,  { duration: 0.3, z: camera.position.z > 0 ? 0.01 : -0.01});-->
<!--        }}>-->
<!--            <i class="fas fa-camera-movie"></i> TopDown View-->
<!--        </button>-->
<!--    </Card>-->
    <canvas class={canvasName}></canvas>
</section>
