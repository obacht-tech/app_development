import type {PersonSpline, Object3DCustom} from "../../../types";
import * as THREE from "three";

const geometry = new THREE.CircleGeometry(1, 16);
export const materialCollision = new THREE.MeshBasicMaterial({color: 'red'});
export const materialNoCollision = new THREE.MeshBasicMaterial({color: 'blue'});

export function collision(circle1: THREE.Object3D, circle2: THREE.Object3D, radius: number): boolean {
    let dx = circle1.position.x - circle2.position.x;
    let dy = circle1.position.z - circle2.position.z;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius * 2;
}

export function generateCollisionCircles(people: PersonSpline[]): THREE.Group {
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

export function updateCollisionCircles(circlesChildren: Object3DCustom[], person: Object3DCustom, circle: Object3DCustom, second, time) {

    circle.visible = true;
    circle.position.x = person.position.x;
    circle.position.z = person.position.z;

    let colliding = false;
    for (let circle2 of circlesChildren) {
        if (circle.uuid !== circle2.uuid && (circle2.timePosition <= second && time - circle2.timePosition <= circle2.timeDelta)) {
            if (collision(circle, circle2, 1)) {
                colliding = true;
            }
        }
    }
    if (colliding) {
        circle.material = materialCollision
    } else {
        circle.material = materialNoCollision
    }
}
