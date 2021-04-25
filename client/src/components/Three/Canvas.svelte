<script lang="ts">

    import * as THREE from "three";
    import {onMount} from "svelte";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";


    type CanvasID = "personCanvas" | "headmapCanvas" | "pathmapCanvas" | "fullCanvas";
    export let cid: CanvasID;
    type ApplicationID = "person" | "headmap" | "pathmap" | "full";
    export let aid: ApplicationID;
    export let inFrame: boolean;

    let sizes: {width, height};

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

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        const scene = new THREE.Scene();
        scene.background = new THREE.Color(`white`);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );


        const controls = new OrbitControls(camera, canvas);
        // controls.enabled = controlsEnabled;
        controls.enableDamping = true;
        controls.minZoom = 0.8;
        controls.maxZoom = 4;
        controls.maxPolarAngle = (Math.PI / 2) * 0.99;

        window.addEventListener('resize', () => {
            sizes = {
                width: width(),
                height: section.clientHeight
            };

            //     // camera.left = -5 * (sizes.width / sizes.height);
            //     // camera.right = 5 * (sizes.width / sizes.height);
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            renderOnce();
        })

        function render() {

            window.requestAnimationFrame(render);
            if (inFrame) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                controls.update();
                renderer.render(scene, camera);
            }
        }

        function renderOnce() { renderer.render(scene, camera); }

        renderOnce();
        render();
    })

</script>

<canvas id={cid}></canvas>
