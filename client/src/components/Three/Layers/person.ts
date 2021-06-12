import * as THREE from "three";
import type {Object3DCustom, PersonSpline, PositionData} from "../../../types";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {collision, materialCollision, materialNoCollision, updateCollisionCircles} from "./collision";

let humanFemaleMesh;
let humanMaleMesh;
let humanObject
export let mixer2
export const positionScaling = 0.01;
const humanMaterial = new THREE.MeshStandardMaterial({
    color: '#C7C700'
})
const manager = new THREE.LoadingManager();
const fbxLoader = new FBXLoader(manager);

fbxLoader.load('/client/static/models/human_female_walk.fbx', function (object) {


    object.traverse(function (child: Object3DCustom) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.scale.set(positionScaling, positionScaling, positionScaling)
           child.position.set(0, 0.33, 0)
            child.material = humanMaterial
            humanFemaleMesh = child
        }
    });
    humanObject = object
});

fbxLoader.load('/client/static/models/human_male.fbx', function (object) {

    // mixer = new THREE.AnimationMixer( object );
    //
    // const action = mixer.clipAction( object.animations[ 0 ] );
    // action.play();

    object.traverse(function (child: Object3DCustom) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.scale.set(positionScaling, positionScaling, positionScaling)
            child.position.set(0, 0.33, 0)
            child.material = humanMaterial
            humanMaleMesh = child
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
                peopleSplines[foundPersonIndex].splineData.push(new THREE.Vector2(person.pos[0] * positionScaling, person.pos[1] * positionScaling))
            } else {
                const newPerson = {
                    pid: person.pid,
                    splineData: [new THREE.Vector2(person.pos[0] * positionScaling, person.pos[1] * positionScaling)],
                    startDate: fetchingData[i].date,
                    timePosition: i
                }
                peopleSplines.push(newPerson)
            }

        }
    }


    return peopleSplines;
}

export function test(scene){
    fbxLoader.load('/client/static/models/Walking.fbx', function (object) {

        mixer2 = new THREE.AnimationMixer( object );

        const action = mixer2.clipAction( object.animations[ 0 ] );
        action.play();

        object.traverse( function ( child ) {

            if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;
                child.scale.set(positionScaling, positionScaling, positionScaling)
                child.position.set(0, 0.33, 0)
              //  child.material = humanMaterial

            }

        } );
        object.scale.set(positionScaling, positionScaling, positionScaling)
          scene.add( object );
    });
}


export function generatePeopleMeshes(people: PersonSpline[]) {
    const peopleGroup = new THREE.Group()
    for (let personSpline of people) {
        const personMesh = humanObject.clone();
        // const personMesh: Object3DCustom = SkeletonUtils.clone(Math.random()>0.5 ? humanMaleMesh : humanFemaleMesh);
        const color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);
        const personMaterial = new THREE.MeshStandardMaterial({
            color
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

export function updatePositions(time: number, second: number, group: THREE.Group, collisionCircles: THREE.Group) {
    const people: Object3DCustom[] = group.children;
    for (let person of people) {
        const moment = time - person.timePosition; // 1.2 sek
        const circle = collisionCircles.children.find((elem) => {
            return elem.uuid === person.uuid
        })

        if (person.timePosition <= second && moment <= person.timeDelta) {

            if (!person.visible) {
                person.visible = true;
            }

            const deltaTimePosition = person.timeDelta; //diffrenz ende-starttime
            const pos = person.spline.getPoint((moment * 100 / deltaTimePosition) * positionScaling);
            person.position.x = pos.x
            person.position.z = pos.y

            updateCollisionCircles(collisionCircles.children, person, circle, second, time)
        } else {
            if (person.visible) {
                person.visible = false
            }
            if (circle.visible) {
                circle.visible = false;
            }
        }
    }
}
