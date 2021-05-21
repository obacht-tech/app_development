import * as THREE from "three";
import type {PersonSpline} from "../../../types";

export function generatePaths(people: PersonSpline[]): THREE.Group {
    const paths = new THREE.Group()
    for (let personSpline of people) {
        const points = personSpline.spline.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);
        const material = new THREE.LineBasicMaterial({color});

        const splineObject = new THREE.Line(geometry, material);
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
    for (let path of paths.children) {
        path.visible = path.timePosition >= start && path.timePosition + path.timeDelta <= end;
    }
}
