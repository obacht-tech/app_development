import h337 from './heatmap_script.js'
import type {ApplicationID, HeatmapPoint, Object3DCustom, PersonSpline} from "../../../types";
import * as THREE from "three";

let heatmapInstance;
let heatmapFullInstance;
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true
});

export function generateHeatmap(people: PersonSpline[], aid: ApplicationID): THREE.Object3D {
    if (aid === 'heatmap') {
        heatmapInstance = h337.create({
            container: document.querySelector('.heatmap'),
            maxOpacity: .6,
            radius: 10,
            blur: .80,
        });
    } else {
        heatmapFullInstance = h337.create({
            container: document.querySelector('.full'),
            maxOpacity: .6,
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
            data: countPoints(points)
        });
    } else {
        heatmapFullInstance.setData({
            data: countPoints(points)
        });
    }
    const heatmapCanvas: HTMLCanvasElement = document.querySelector('canvas.heatmap-canvas');
    const heatMapTexture: THREE.CanvasTexture = new THREE.CanvasTexture(heatmapCanvas);

    return initHeatmapPlane(heatMapTexture);
}


function initHeatmapPlane(texture: THREE.CanvasTexture): THREE.Object3D {

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMaterial.map = texture;
    plane.material = planeMaterial;
    plane.material.needsUpdate = true;
    plane.rotateX(-Math.PI / 2);
    plane.position.y = -.49;
    return plane;
}


export function rangeHeatmap(start: number, end: number, people: PersonSpline[], aid: ApplicationID, plane: Object3DCustom) {
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

function countPoints(points: HeatmapPoint[]) {
    return Object.values(points.reduce((r, point) => {
        let k = `${point.x}|${point.y}`;
        if (!r[k]) r[k] = {...point, value: 1}
        else r[k].value += 1;
        return r;
    }, {}))
}


