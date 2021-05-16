import * as THREE from "three";
import type {PersonSpline, PositionData} from "../../../types";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

let humanMesh;
const positionScaling = 0.01;
const humanMaterial = new THREE.MeshStandardMaterial({
    color: '#C7C700'
})
const manager = new THREE.LoadingManager();
const fbxLoader = new FBXLoader(manager);

fbxLoader.load('/client/static/models/human_female.fbx', function (object) {

    // mixer = new THREE.AnimationMixer( object );
    //
    // const action = mixer.clipAction( object.animations[ 0 ] );
    // action.play();

    object.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.scale.set(positionScaling, positionScaling, positionScaling)
            child.position.set(0, 0.33, 0)
            child.material = humanMaterial
            humanMesh = child
        }
    });
});

export function initSplines(fetchingData: PositionData[]): PersonSpline[] {
    const peopleSplines: PersonSpline[] = []
    for (let i = 0; i < fetchingData.length; i++) {

        for (let person of fetchingData[i].people) {
            const foundPersonIndex = peopleSplines.findIndex((personSpline) => {
                return personSpline.pid === person.pid;
            })

            if (foundPersonIndex > -1) {
                peopleSplines[foundPersonIndex].splineData.push(new THREE.Vector2(person.pos[0], person.pos[1]))
            } else {
                const newPerson = {
                    pid: person.pid,
                    splineData: [new THREE.Vector2(person.pos[0], person.pos[1])],
                    startDate: fetchingData[i].date,
                    timePosition: i
                }
                peopleSplines.push(newPerson)
            }

        }
    }


    return peopleSplines;
}

export function generatePeopleMeshes(people: PersonSpline[]) {
    const peopleGroup = new THREE.Group()
    for (let personSpline of people) {
        const personMesh = SkeletonUtils.clone(humanMesh);
        const personMaterial = new THREE.MeshStandardMaterial({
            color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
        })
        personSpline.spline = new THREE.SplineCurve(personSpline.splineData);
        personSpline.timeDelta = personSpline.splineData.length - 1;

        personMesh.visible = false
        personMesh.position.x = Math.random();
        personMesh.position.z = 0;
        personMesh.uuid = personSpline.pid;
        personMesh.material = personMaterial;
        personMesh.spline = personSpline.spline;
        personMesh.timePosition = personSpline.timePosition;
        personMesh.timeDelta = personSpline.timeDelta;

        peopleGroup.add(personMesh)
    }
    return peopleGroup
}

export function updatePositions(time: number, second: number, group: THREE.Group) {
    for (let person of group.children) {
        const moment = time - person.timePosition; // 1.2 sek
        if (person.timePosition <= second && moment <= person.timeDelta) {
            if (!person.visible) {
                person.visible = true;
            }
            const deltaTimePosition = person.timeDelta; //diffrenz ende-starttime
            const pos = person.spline.getPoint((moment * 100 / deltaTimePosition) * 0.01);
            person.position.x = pos.x * positionScaling
            person.position.z = pos.y * positionScaling
        } else {
            if (person.visible) {
                person.visible = false
            }
        }
    }
}
