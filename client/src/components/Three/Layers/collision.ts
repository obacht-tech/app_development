import type {PersonSpline, Object3DCustom} from "../../../types";
import * as THREE from "three";

const geometry = new THREE.CircleGeometry( 1, 16 );
export const materialCollision = new THREE.MeshBasicMaterial( { color: 'red' } );
export const materialNoCollision = new THREE.MeshBasicMaterial( { color: 'blue' } );

export function collision(circle1: THREE.Object3D, circle2: THREE.Object3D, radius: number): boolean{
    let dx = circle1.position.x - circle2.position.x;
    let dy = circle1.position.z - circle2.position.z;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius*2;
}

export function generateCollisionCircles(people: PersonSpline[]): THREE.Group{
    let collisionCircles: THREE.Group = new THREE.Group();
    for (let personSpline of people) {
        const circle: Object3DCustom = new THREE.Mesh(geometry, materialNoCollision);
        circle.rotateX(-Math.PI / 2);
        circle.uuid = personSpline.pid;
        circle.visible = true;
        circle.position.z = .48;
        circle.timePosition = personSpline.timePosition;
        circle.timeDelta = personSpline.timeDelta;
        collisionCircles.add(circle);
    }
    return collisionCircles;
}

export function updateCollisionCircles(group: THREE.Group) {
    const circles: Object3DCustom[] = group.children;
}
