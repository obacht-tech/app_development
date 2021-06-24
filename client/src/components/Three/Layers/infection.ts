import {distance, incidence, infectionRate, maskWear, timeInfection} from "../../../store";
import type {Object3DCustom} from "../../../types";

import * as THREE from "three";
import {collision} from "./collision";

let distanceValue;
let incidenceValue;
let timeInfectionValue;
let maskWearValue;

distance.subscribe((value) => {
    distanceValue = value.new;
})
incidence.subscribe((value) => {
    incidenceValue = value;
})
timeInfection.subscribe((value) => {
    timeInfectionValue = value;
})
maskWear.subscribe((value) => {
    maskWearValue = value;
})
infectionRate.subscribe(value => {
    console.log(value)
})


export function calculateInfection(people: Object3DCustom[], second: number) {
    for (let person of people) {
        if (person.isInfected || person.timePosition > second) {
            continue;
        }
        for (let person2 of people) {
            /* for (let i = 0; i <= second; i++) {
                 if (person.uuid !== person2.uuid && (person2.timePosition <= second && i - person2.timePosition <= person2.timeDelta)) {
                     if (collision(person, person2)) {
                         if(person2.isInfected){
                             setInfection(person, true)
                             break;
                         }

                     }
                 }
             }*/

        }
    }

}


export function percentBool(percentage: number): boolean {
    const r = Math.random();
    return r * 100 < percentage;
}


export function updateIncidence(people: Object3DCustom[]) {
    // for (let person of people) {
    //     person.isInfected = percentBool(incidenceValue.new*100/100000);
    // }
}

export function updateWearMask(people: Object3DCustom[]) {
    // for (let person of people) {
    //     person.wearsMask = percentBool(maskWearValue);
    // }
}


export function updateDistances(people: Object3DCustom[], radius, start: number, end: number): number {
    console.log(people.length, radius, start,end)
    let restPeople = [...people];
    let collidingPeople = [];
    for (let i = start; i <= end; i++) {
        for (let personI = 0; personI < restPeople.length; personI++) {
            if (restPeople[personI].timePosition <= i && (i - restPeople[personI].timePosition <= restPeople[personI].timeDelta)) {
                let isColliding = false;
                for (let person2 of people) {
                    if (restPeople[personI].uuid !== person2.uuid && (person2.timePosition <= i && i - person2.timePosition <= person2.timeDelta)) {
                        if (collision(restPeople[personI], person2, radius)) {
                            isColliding = true;
                            break;

                        }
                    }
                }
                if (isColliding) {
                    collidingPeople.push(restPeople[personI].uuid)

                }
            }

        }
    }
// delete all duplicates
    let uniq = [...new Set(collidingPeople)];

    return people.length - uniq.length;
}

export function setInfection(person: Object3DCustom, isInfected: boolean) {
    person.isInfected = isInfected;
    if (isInfected) {
        person.material.color = new THREE.Color('red')
    }

}
