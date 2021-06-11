import * as THREE from "three";
import type {Object3DCustom, PersonSpline, PositionData} from "../../../types";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {updateCollisionCircles} from "./collision";
import {calculateInfection, percentBool, updateIncidence} from "./infection";
import {incidence, infectionRate, maskWear} from "../../../store";

let humanMesh;
let incidenceValue;
let maskWearValue;
let infectionRateValue;

export const positionScaling = 0.01;
const humanMaterial = new THREE.MeshStandardMaterial({
    color: '#C7C700'
})
const manager = new THREE.LoadingManager();
const fbxLoader = new FBXLoader(manager);

incidence.subscribe(value => {
    incidenceValue = value;
})

maskWear.subscribe(value => {
    maskWearValue = value;
})

infectionRate.subscribe(value => {
    infectionRateValue = value;
})

fbxLoader.load('/client/static/models/human_female.fbx', function (object) {

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
                peopleSplines[foundPersonIndex].splineData.push(new THREE.Vector2(person.pos[0] * positionScaling, person.pos[1] * positionScaling))
            } else {
                const newPerson = {
                    pid: person.pid,
                    splineData: [new THREE.Vector2(person.pos[0] * positionScaling, person.pos[1] * positionScaling)],
                    startDate: fetchingData[i].date,
                    timePosition: i,
                    wearsMask : percentBool(maskWearValue.new),
                   // isInfected :  percentBool(incidenceValue.new*100/100000)
                    isInfected :  percentBool(incidenceValue.new*100/1000)
                }
                peopleSplines.push(newPerson)
            }

        }
    }


    return peopleSplines;
}

export async function generatePeopleWithAnimations(people: PersonSpline[]): Promise<THREE.Group> {
    return new Promise((resolve) => {
        fbxLoader.load('/client/static/models/human_male_walking.fbx', function (male_object) {
            male_object.scale.set(positionScaling, positionScaling, positionScaling)
            male_object.traverse(function (child: Object3DCustom) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.scale.set(positionScaling, positionScaling, positionScaling)
                    child.position.set(0, 0.33, 0)
                }

            });

            fbxLoader.load('/client/static/models/human_female_walking.fbx', function (female_object) {
                female_object.scale.set(positionScaling, positionScaling, positionScaling)
                female_object.traverse(function (child: Object3DCustom) {

                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.scale.set(positionScaling, positionScaling, positionScaling)
                        child.position.set(0, 0.33, 0)
                    }

                });
                const meshes = generatePeopleMeshes(people, male_object, female_object)
                resolve(meshes);
            })

        });
    });

}


export function generatePeopleMeshes(people: PersonSpline[], maleObject, femaleObject) {
    const peopleGroup = new THREE.Group()
   /*  for (let personSpline of people) {
        const object = Math.random() > 0.5 ? maleObject : femaleObject;
        const personMesh: Object3DCustom = SkeletonUtils.clone(object)
        personMesh.animations = [...object.animations];
        const mixernew = new THREE.AnimationMixer(personMesh);
        const action = mixernew.clipAction(object.animations[0]);
        personMesh.mixer = mixernew;
        action.play();
        const color = new THREE.Color(0xffffff);
        color.setHex(Math.random() * 0xffffff);
        const personMaterial = new THREE.MeshStandardMaterial({
            color
        })
        personSpline.spline = new THREE.SplineCurve(personSpline.splineData);
        personSpline.timeDelta = personSpline.splineData.length - 1; */
    for (let i = 0; i< people.length; i++ ) {
        const object = Math.random() > 0.5 ? maleObject : femaleObject;
        const personMesh: Object3DCustom = SkeletonUtils.clone(object)
        personMesh.animations = [...object.animations];
        const mixernew = new THREE.AnimationMixer(personMesh);
        const action = mixernew.clipAction(object.animations[0]);
        personMesh.mixer = mixernew;
        action.play();
       // const color = new THREE.Color(0xffffff);
       //  color.setHex(Math.random() * 0xffffff);
       //  const personMaterial = new THREE.MeshStandardMaterial({
       //      color
       //  })
        people[i].spline = new THREE.SplineCurve(people[i].splineData);
        people[i].timeDelta = people[i].splineData.length - 1;


        personMesh.visible = false
        personMesh.position.x = Math.random();
        personMesh.position.z = 0;
        personMesh.uuid = people[i].pid;
        //personMesh.material = personMaterial;
        personMesh.spline = people[i].spline;
        personMesh.timePosition = people[i].timePosition;
        personMesh.timeDelta = people[i].timeDelta;
        personMesh.wearsMask = people[i].wearsMask;
        personMesh.isInfected = people[i].isInfected;
        personMesh.isIncidenceInfected = people[i].isInfected;
        // min 1 infected

        if(personMesh.wearsMask){
            personMesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color('green')
                  })

        }
        if(personMesh.isInfected){
            personMesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color('red')
            })
            console.log('Infected')
        }

        peopleGroup.add(personMesh)
    }

    // minimum 1 infected
      /*   peopleGroup.children[3].isInfected = true;
        peopleGroup.children[3].isIncidenceInfected = true;
 */
    return peopleGroup
}

export function updateAnimation() {

}

export function updatePositions(time: number, second: number, group: THREE.Group, collisionCircles: THREE.Group, delta: number) {
    const people: Object3DCustom[] = group.children;
    let infections: number = 0;
    for (let person of people) {
        const moment = time - person.timePosition; // 1.2 sek
        const circle = collisionCircles.children.find((elem) => {
            return elem.uuid === person.uuid
        })

        if (person.timePosition <= second && moment <= person.timeDelta) {

            if (!person.visible) {
                person.visible = true;
            }

            const pos = person.spline.getPoint(moment / person.timeDelta);
            person.position.x = pos.x
            person.position.z = pos.y


            const t = ((moment+ delta) / (person.timeDelta))
            if(t <= 1){
                // Rotate to walk direction
                const nextPos = person.spline.getPoint(t);
                const currentVector = new THREE.Vector3();
                currentVector.subVectors(new THREE.Vector3(nextPos.x, 0, nextPos.y), new THREE.Vector3(pos.x, 0, pos.y))
                const atan = Math.atan2(currentVector.x, currentVector.z);
                person.rotation.y = atan;

                // recalculate animation speed (speed of walking)
                 const speed = currentVector.length();
                 person.mixer = person.mixer.update(speed);

            }


            updateCollisionCircles(collisionCircles.children, person, circle, second, time)
        } else {
            if (person.visible) {
                person.visible = false
            }
            if (circle.visible) {
                circle.visible = false;
            }
        }

        if(person.isInfected){
            infections++;
        }
    }
    if(infections!=infectionRateValue){
        infectionRate.set(infections)
    }
}
