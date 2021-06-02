import * as THREE from "three";


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

    const material = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        const planeGeometry = new THREE.CircleBufferGeometry(20, 128);
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotateX(-Math.PI / 2);
        planeMaterial.map = null;
        plane.position.y = -.5;
        sceneEnvironment.add(plane);

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

    // sceneEnvironment.add(cube0, cube1, cube2);


    return sceneEnvironment;
}


