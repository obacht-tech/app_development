import type {PersonSpline, Object3DCustom} from "../../../types";
import * as THREE from "three";
import {distance} from "../../../store";

let geometry =  new THREE.RingGeometry(0.8, 1, 18);
export const materialCollision = new THREE.MeshBasicMaterial({color: 'red'});
export const materialNoCollision = new THREE.MeshBasicMaterial({color: '#18A0FB'});
let radius = 1;

distance.subscribe((value)=>{
    radius = value.new/2;
    const redoScalingFactor = 1/(value.old/2);
    geometry.scale(redoScalingFactor,redoScalingFactor,redoScalingFactor)
    geometry.scale(value.new/2,value.new/2 ,value.new/2 )
})

export function collision(circle1: THREE.Object3D, circle2: THREE.Object3D, radiusVal?:number): boolean {
    const dx = circle1.position.x - circle2.position.x;
    const dy = circle1.position.z - circle2.position.z;
    const resultDistance = Math.sqrt(dx * dx + dy * dy);
    return resultDistance <= (radiusVal ? radiusVal*2 : radius*2);
}

export function generateCollisionCircles(people: PersonSpline[]): THREE.Group {
    let collisionCircles: THREE.Group = new THREE.Group();
    for (let personSpline of people) {

        const circle: Object3DCustom = new THREE.Mesh(geometry, materialNoCollision);
        circle.rotateX(-Math.PI / 2);
        circle.uuid = personSpline.pid;
        circle.visible = true;
        circle.position.y = -0.49;
        circle.timePosition = personSpline.timePosition;
        circle.timeDelta = personSpline.timeDelta;
        circle.isInfected = personSpline.isInfected;
        circle.wearsMask = personSpline.wearsMask;
        collisionCircles.add(circle);
    }
    return collisionCircles;
}

export function updateCollisionCircles(people: Object3DCustom[], person: Object3DCustom, circle: Object3DCustom, second: number, time: number) {
    circle.visible = true;
    circle.position.x = person.position.x;
    circle.position.z = person.position.z;

    let colliding = false;
    for (let circle2 of people) {
        if (circle.uuid !== circle2.uuid && (circle2.timePosition <= second && time - circle2.timePosition <= circle2.timeDelta)) {
            if (collision(circle, circle2)) {
                colliding = true;
               if(circle2.isInfected){
                   person.isInfected = true;
                   break
               }
            }

        }
    }
    if (colliding) {
        circle.material = materialCollision;
    } else {
        circle.material = materialNoCollision
    }
}
