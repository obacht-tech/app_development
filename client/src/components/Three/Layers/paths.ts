import * as THREE from "three";
import type {Object3DCustom, PersonSpline} from "../../../types";

export function generatePaths(people: PersonSpline[]): THREE.Group {
    const paths = new THREE.Group()
    for (let personSpline of people) {
        const points = personSpline.spline.getPoints(200);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const color = new THREE.Color('#18A0FB');
       // color.setHex(Math.random() * 0xffffff);
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


export function rangePaths(paths: THREE.Group, start: number, end: number) {
    const allPaths: Object3DCustom[] = paths.children;
    for (let path of allPaths) {
        const pathRange = path.timePosition + path.timeDelta;
        path.visible = (path.timePosition >= start && path.timePosition <= end) || (pathRange >= start && pathRange <= end);
    }
}
