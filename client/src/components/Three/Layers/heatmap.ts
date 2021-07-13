/**
 * Heatmap Logic
 * Developer: Silvia Tosato
 */
import h337 from './heatmap_script.js'
import type {ApplicationID, HeatmapPoint, Object3DCustom, PersonSpline} from "../../../types";
import * as THREE from "three";

let heatmapInstance;
let heatmapFullInstance;
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true
});
/**
 * Heatmap Instanciation and generate Plane with CanvasTexture of Heatmap
 *
 * @export
 * @param {PersonSpline[]} people
 * @param {ApplicationID} aid
 * @return {*}  {THREE.Object3D}
 */
export function generateHeatmap(people: PersonSpline[], aid: ApplicationID): THREE.Object3D {
    if (aid === 'heatmap') {
        heatmapInstance = h337.create({
            container: document.querySelector('.heatmap'),
          //  maxOpacity: .6,
            radius: 10,
            blur: .80,
        });
    } else {
        heatmapFullInstance = h337.create({
            container: document.querySelector('.full'),
           // maxOpacity: .6,
            radius: 10,
            blur: .80,
        });
    }


    const points: HeatmapPoint[] = [];
    for (let i = 0; i < people.length; i++) {
        for (let position of people[i].splineData) {
            const point: HeatmapPoint = {

                x: Math.floor(position.x * 100 + 500),
                y: Math.floor(position.y * 100 + 500)
            }
            points.push(point)
        }
    }
    if (aid === 'heatmap') {
        heatmapInstance.setData({
           data: points
        });
    } else {
        heatmapFullInstance.setData({
            data: points
        });
    }
    const heatmapCanvas: HTMLCanvasElement = document.querySelector('canvas.heatmap-canvas');
    const heatMapTexture: THREE.CanvasTexture = new THREE.CanvasTexture(heatmapCanvas);

    return initHeatmapPlane(heatMapTexture);
}

/**
 * returns Plane with given Texture
 *
 * @param {THREE.CanvasTexture} texture
 * @return {*}  {THREE.Object3D}
 */
function initHeatmapPlane(texture: THREE.CanvasTexture): THREE.Object3D {
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMaterial.map = texture;
    plane.material = planeMaterial;
    plane.material.needsUpdate = true;
    plane.rotateX(-Math.PI / 2);
    plane.position.y = -.5;
    return plane;
}

/**
 * updates Heatmap with given range Values
 *
 * @export
 * @param {number} start
 * @param {number} end
 * @param {PersonSpline[]} people
 * @param {ApplicationID} aid
 * @param {Object3DCustom} plane
 */
export function updateHeatmap(start: number, end: number, people: PersonSpline[], aid: ApplicationID, plane: Object3DCustom) {
    const points: HeatmapPoint[] = [];
    for (let i = 0; i < people.length; i++) {
        const pathRange = people[i].timePosition + people[i].timeDelta;
        if ((people[i].timePosition >= start && people[i].timePosition <= end) || (pathRange >= start && pathRange <= end)) {
            for (let position of people[i].splineData) {
                const point: HeatmapPoint = {
                    x: Math.floor(position.x * 100 + 500),
                    y: Math.floor(position.y * 100 + 500)
                }
                points.push(point)
            }
        }

    }

    heatmapInstance.setData({
        data:  points
    });

    if (aid === 'full') {
        const heatmapCanvas: HTMLCanvasElement = document.querySelector('canvas.heatmap-canvas');
        planeMaterial.map = new THREE.CanvasTexture(heatmapCanvas);
        plane.material = planeMaterial;
        plane.material.needsUpdate = true;
    }


}
