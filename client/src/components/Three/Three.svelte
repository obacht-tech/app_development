<script lang="ts">
    import { onMount } from 'svelte';
    // import main from "./three";
    import Stats from "stats.js";
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import * as dat from 'dat.gui';
    import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
    import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass";
    import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
    // import {SSAOPass} from "three/examples/jsm/postprocessing/SSAOPass";
    // import galaxyVertexShader from '../../shaders/galaxy/vertex.glsl'
    // import galaxyFragmentShader from '../../shaders/galaxy/fragment.glsl'


    onMount(() => {
        function main() {

            /**
             * Base
             */
            // Debug
            // const gui = new dat.GUI()

            // Stats
            const stats = new Stats()
            document.body.appendChild(stats.dom)

            // Canvas
            const canvas: HTMLCanvasElement = document.querySelector('canvas.webgl')

            // Scene
            const scene = new THREE.Scene();
            scene.fog = new THREE.Fog(0xffffff, 5, 15);
            scene.background = new THREE.Color(0xffffff);

            /**
             * Light
             */

            const ambientLight = new THREE.AmbientLight( 0xffffff, 0.80 );
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight( 0x404040, 1 );
            directionalLight.position.z = 3;
            directionalLight.position.y = 3;
            directionalLight.position.x = 2;
            scene.add(directionalLight);

            // const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
            // scene.add(directionalLightCameraHelper)

            /**
             * Material
             */
            const material = new THREE.MeshStandardMaterial({color: 0xffffff})

            /**
             * Plane
             */
            const planeGeometry = new THREE.CircleBufferGeometry(5, 128);
            const plane = new THREE.Mesh(planeGeometry, material);
            plane.rotateX(-Math.PI / 2);
            plane.scale.set(100, 100, 100);
            plane.position.y = -.5;

            /**
             * Cube
             */
            const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1);
            const cube0 = new THREE.Mesh(cubeGeometry, material);
            cube0.scale.set(1, 2, 3);
            cube0.position.set(-3, 0.5, 1);

            const cube1 = new THREE.Mesh(cubeGeometry, material);
            cube1.scale.set(1, 1, 2.5);
            cube1.position.set(-2, 0, -2.5);
            cube1.rotateY(-Math.PI * 0.25);

            const cube2 = new THREE.Mesh(cubeGeometry, material);
            cube2.scale.set(1, 2, 2.5);
            cube2.position.set(3, 0.5, -0.5);
            cube2.rotateY(Math.PI * 0.1);

            scene.add(cube0, cube1, cube2);
            scene.add(plane);

            /**
             * Sizes
             */
            const sizes = {
                width: window.innerWidth,
                height: window.innerHeight
            }

            window.addEventListener('resize', () =>
            {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                // Update camera
                // camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

                // Update renderer
                renderer.setSize(sizes.width, sizes.height)
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            })

            /**
             * Camera
             */
            // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
            const aspectRatio = sizes.width / sizes.height
            const camera = new THREE.OrthographicCamera(- 5 * aspectRatio, 5 * aspectRatio, 5, - 5, 0.1, 100);
            camera.position.x = 15
            camera.position.y = 10
            camera.position.z = 10
            scene.add(camera)

            // Controls
            const controls = new OrbitControls(camera, canvas);
            controls.enableDamping = true;
            controls.minZoom = 0.8;
            controls.maxZoom = 2.5;

            /**
             * Renderer
             */
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                // alpha: true,
            })
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // const renderTarget = new THREE.WebGLRenderTarget(600, 800, {
            //     minFilter: THREE.LinearFilter,
            //     magFilter: THREE.LinearFilter,
            //     format: THREE.RGBAFormat,
            //     encoding: THREE.sRGBEncoding
            // })

            const effectComposer = new EffectComposer(renderer)
            effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            effectComposer.setSize(sizes.width, sizes.height)

            const renderPass = new RenderPass(scene, camera)
            effectComposer.addPass(renderPass)

            const saoPass = new SAOPass(scene, camera);
            saoPass.params.saoBias = 0.5;
            saoPass.params.saoIntensity = 0.002;
            saoPass.params.saoScale = 1;
            saoPass.params.saoKernelRadius = 100;
            saoPass.params.saoMinResolution = 0;
            saoPass.params.saoBlur = 1;
            saoPass.params.saoBlurRadius = 8;
            saoPass.params.saoBlurStdDev = 4;
            saoPass.params.saoBlurDepthCutoff = 0.01;
            effectComposer.addPass(saoPass);

            /**
             * Animate
             */
            const clock = new THREE.Clock()

            const tick = () =>
            {
                stats.begin()

                // const elapsedTime = clock.getElapsedTime()

                // Update controls
                controls.update()

                // Render
                // renderer.render(scene, camera)
                effectComposer.render()

                // Call tick again on the next frame
                window.requestAnimationFrame(tick)

                stats.end()
            }

            tick()
        }

        main();
    })


</script>

<style lang="sass">
    #three
        margin: auto
        padding: 0
        position: absolute
        display: block
        height: 100%
        width: 100%
        top: 0

    canvas
        display: block
        height: 100%
        width: 100%
</style>

<section id="three">
    <canvas class="webgl"></canvas>
</section>
