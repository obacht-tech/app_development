import * as THREE from "three";

import {positionScaling} from "./Layers/person";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import type {Object3DCustom} from "../../types";


export default function (): THREE.Group {
    const sceneEnvironment = new THREE.Group();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneEnvironment.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040, 4);
    directionalLight.castShadow = true;
    directionalLight.position.z = 3;
    directionalLight.position.y = 3;
    directionalLight.position.x = 2;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    sceneEnvironment.add(directionalLight);

    const loader = new THREE.TextureLoader();
    loader.load(
        'client/static/303.png',
        function (texture) {
            const planeMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: texture, transparent: true
            });
            const planeGeometry = new THREE.PlaneGeometry( 2*6.2, 1.45*6.2 );
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            plane.rotateX(-Math.PI / 2);
            plane.position.y = -.6;
            plane.position.x = 0.8
            sceneEnvironment.add(plane);
        },
    );
    const fbxLoader = new FBXLoader();
    fbxLoader.load('/client/static/models/room304.fbx', function (room) {
        room.scale.set(positionScaling, positionScaling, positionScaling)
        room.traverse(function (child: Object3DCustom) {

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
               // child.scale.set(0.95, 0.95, 0.95)
                child.position.set(0, 0, 0)
                //sceneEnvironment.add(child)
            }



        });});


    const material = new THREE.MeshStandardMaterial({color: 0xbbbbbb});

    const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1);
    const cube0 = new THREE.Mesh(cubeGeometry, material);
    cube0.castShadow = true;
    cube0.scale.set(0.2, 0.5, 3);
    cube0.position.set(-5.1, 1, 1);

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

    // sceneEnvironment.add(cube0, cube1, cube2);


    return sceneEnvironment;
}


