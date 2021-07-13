/**
 * Environment Logic
 * Developers: Silvia Tosato and Valentin Rogg
 */
import * as THREE from "three";
/**
 *  Init Environment
 *
 * @export
 * @return {*}  {THREE.Group}
 */
export default function (): THREE.Group {
    const sceneEnvironment = new THREE.Group();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    //0.5
    sceneEnvironment.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040, 1);//4
    directionalLight.castShadow = true;
    directionalLight.position.z = 0;
    directionalLight.position.y = 8;
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
                map: texture, transparent: true
            });
            const planeGeometry = new THREE.PlaneGeometry(2 * 6.2, 1.45 * 6.2);
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            plane.rotateX(-Math.PI / 2);
            plane.position.y = -.51;
            plane.position.x = 0.8
            sceneEnvironment.add(plane);
        },
    );

    return sceneEnvironment;
}


