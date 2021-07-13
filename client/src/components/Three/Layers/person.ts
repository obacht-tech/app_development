/**
 * People Logic
 * Developer: Silvia Tosato
 */
import * as THREE from "three";
import type {Object3DCustom, PersonSpline, PlaybackState, PositionData} from "../../../types";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {updateCollisionCircles} from "./collision";
import datasetDates from "../../../env";

export const positionScaling = 0.01;

const humanMaterial = new THREE.MeshStandardMaterial({
    color: 'red'
})

const manager = new THREE.LoadingManager();
const fbxLoader = new FBXLoader(manager);


/**
 * Reformat PositionData to Type PersonSpline
 *
 * @export
 * @param {PositionData[]} fetchingData
 * @return {*}  {PersonSpline[]}
 */
export function initSplines(fetchingData: PositionData[]): PersonSpline[] {
    const peopleSplines: PersonSpline[] = []
    for (let i = 0; i < fetchingData.length; i++) {

        for (let person of fetchingData[i].people) {
            const position = new THREE.Vector2(person.pos[0] * positionScaling, person.pos[1] * positionScaling);
            const foundPersonIndex = peopleSplines.findIndex((personSpline) => {
                return personSpline.pid === person.pid;
            })

            if (foundPersonIndex > -1) {
                peopleSplines[foundPersonIndex].splineData.push(position)
            } else {
                // @ts-ignore
                const relativeTimePosition = Math.floor(((new Date(fetchingData[i].date) - datasetDates.start) / 1000))
                const newPerson: PersonSpline = {
                    pid: person.pid,
                    splineData: [position],
                    startDate: fetchingData[i].date,
                    timePosition: relativeTimePosition,
                }
                peopleSplines.push(newPerson)
            }

        }
    }


    return peopleSplines;
}

/**
 *  Loads Models and generates People With Animations
 *  for Three.js Scene
 *
 * @export
 * @param {PersonSpline[]} people
 * @return {*}  {Promise<THREE.Group>}
 */
export async function generatePeopleWithAnimations(people: PersonSpline[]): Promise<THREE.Group> {
    return new Promise((resolve) => {
        fbxLoader.load('/client/static/models/human_male_walking.fbx', function (male_object: THREE.Group) {
            male_object.scale.set(positionScaling, positionScaling, positionScaling)
            male_object.traverse(function (child: Object3DCustom) {

                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.scale.set(positionScaling, positionScaling, positionScaling)
                    child.position.set(0, 0, 0)
                    child.material.material = humanMaterial;
                }

            });

            fbxLoader.load('/client/static/models/human_female_walking.fbx', function (female_object: THREE.Group) {
                female_object.scale.set(positionScaling, positionScaling, positionScaling)
                female_object.traverse(function (child: Object3DCustom) {

                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.scale.set(positionScaling, positionScaling, positionScaling)
                        child.position.set(0, 0, 0)
                    }

                });
                const meshes = generatePeopleMeshes(people, male_object, female_object)
                resolve(meshes);
            })

        });
    });

}

/**
 *  Part of generatePeopleWithAnimations
 *  Initialisies People Meshes and AnimationMixers
 *
 * @export
 * @param {PersonSpline[]} people
 * @param {THREE.Group} maleObject
 * @param {THREE.Group} femaleObject
 * @return {*}  {THREE.Group}
 */
export function generatePeopleMeshes(people: PersonSpline[], maleObject: THREE.Group, femaleObject: THREE.Group): THREE.Group {
    const peopleGroup = new THREE.Group()
    for (let i = 0; i < people.length; i++) {
        const object: THREE.Group = Math.random() > 0.5 ? maleObject : femaleObject;
        const personMesh: Object3DCustom = SkeletonUtils.clone(object)
        personMesh.animations = [...object.animations];
        const mixerNew = new THREE.AnimationMixer(personMesh);
        const action = mixerNew.clipAction(object.animations[0]);
        personMesh.mixer = mixerNew;
        action.play();

        people[i].spline = new THREE.SplineCurve(people[i].splineData);
        people[i].timeDelta = people[i].splineData.length - 1;

        personMesh.visible = false;
        personMesh.position.x = Math.random();
        personMesh.position.z = 0;
        personMesh.position.y = -0.5;
        personMesh.uuid = people[i].pid;
        personMesh.spline = people[i].spline;
        personMesh.timePosition = people[i].timePosition;
        personMesh.timeDelta = people[i].timeDelta;

        peopleGroup.add(personMesh)
    }
    return peopleGroup
}

/**
 *  updates the Mixer of Persons Animations
 *  with Rotations and Speed
 *
 * @export
 * @param {number} moment
 * @param {Object3DCustom} person
 * @param {number} delta
 * @param {THREE.Vector2} pos
 */
export function updateAnimation(moment: number, person: Object3DCustom, delta: number, pos: THREE.Vector2) {
    const t = ((moment + delta) / (person.timeDelta))
    if (t <= 1) {
        // Rotate to walk direction
        const nextPos = person.spline.getPoint(t);
        const currentVector = new THREE.Vector3();
        currentVector.subVectors(new THREE.Vector3(nextPos.x, 0, nextPos.y), new THREE.Vector3(pos.x, 0, pos.y))
        person.rotation.y = Math.atan2(currentVector.x, currentVector.z);

        // recalculate animation speed (speed of walking)
        const speed = currentVector.length();
        person.mixer = person.mixer.update(speed);
    }
}

/**
 * updates Positions, Animations and Collisions
 *
 * @export
 * @param {number} time
 * @param {number} second
 * @param {THREE.Group} group
 * @param {THREE.Group} collisionCircles
 * @param {number} delta
 * @param {PlaybackState} playbackState
 */
export function updatePositions(time: number, second: number, group: THREE.Group, collisionCircles: THREE.Group, delta: number, playbackState: PlaybackState) {
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

            const pos = person.spline.getPoint(moment / person.timeDelta);
            person.position.x = pos.x;
            person.position.z = pos.y;

            if (playbackState !== 'stop') {
                updateAnimation(moment, person, delta, pos);
            }

            updateCollisionCircles(collisionCircles.children, person, circle, second, time);
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
