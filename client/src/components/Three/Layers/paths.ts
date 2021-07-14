/**
 * Paths Logic
 * Developer: Silvia Tosato
 */
import * as THREE from "three";
import type {Object3DCustom, PersonSpline} from "../../../types";

const colors = ['#C7C700',
    '#FFD500',
    '#FF0000',
    '#18A0FB',
    '#CC00CC',
    '#960064',
    '#FFD500',
    '#FF0000',
    '#18A0FB',
    '#C7C700']

/**
 * generates Paths of given Splines
 *
 * @export
 * @param {PersonSpline[]} people
 * @return {*}  {THREE.Group}
 */
export function generatePaths(people: PersonSpline[]): THREE.Group {
    const paths = new THREE.Group()
    for (let personSpline of people) {
        const points = personSpline.spline.getPoints(200);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const randomIndex = Math.floor(Math.random() * 10);
        const color = new THREE.Color(colors[randomIndex]);
        const material = new THREE.LineBasicMaterial({color});

        const splineObject: Object3DCustom = new THREE.Line(geometry, material);
        splineObject.visible = true
        splineObject.position.y = -.49
        splineObject.timePosition = personSpline.timePosition;
        splineObject.timeDelta = personSpline.timeDelta;
        splineObject.rotateX(Math.PI / 2)
        paths.add(splineObject)
    }

    return paths;
}

/**
 * update Pathmap with given range Values
 *
 * @export
 * @param {THREE.Group} paths
 * @param {number} start
 * @param {number} end
 */
export function updatePaths(paths: THREE.Group, start: number, end: number) {
    const allPaths: Object3DCustom[] = paths.children;
    for (let path of allPaths) {
        const pathRange = path.timePosition + path.timeDelta;
        path.visible = (path.timePosition >= start && path.timePosition <= end) || (pathRange >= start && pathRange <= end);
    }
}
