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
    let existingPeople = [];
    let collidingPeople = [];
    for (let i = start; i <= end; i++) {
        for (let personI = 0; personI < people.length; personI++) {
            if (people[personI].timePosition <= i && (i - people[personI].timePosition <= people[personI].timeDelta)) {
                let isColliding = false;
                for (let person2 of people) {
                    if ((people[personI].uuid !== person2.uuid) && (person2.timePosition <= i && (i - person2.timePosition <= person2.timeDelta))) {
                        const mom = i - people[personI].timePosition
                        const posPerson1 = people[personI].spline.getPoint(mom > 0 ?((i - people[personI].timePosition) / people[personI].timeDelta):0);
                        const posPerson2 = person2.spline.getPoint(mom > 0 ?((i - people[personI].timePosition) / people[personI].timeDelta):0);

                        const dx = posPerson1.x - person2.position.x;
                        const dy = posPerson1.y - person2.position.z;
                        const resultDistance = Math.sqrt(dx * dx + dy * dy);
                        isColliding = resultDistance <= radius * 2;
                        if (isColliding) {
                            break;
                        }
                    }
                }
                if (isColliding) {
                    collidingPeople.push(people[personI].uuid)
                }
            }

        }
    }
// delete all duplicates
    let uniqueColliding = [...new Set(collidingPeople)];
    let uniqueExisting = [...new Set(existingPeople)];
    return people.length - uniqueColliding.length;
}

export function setInfection(person: Object3DCustom, isInfected: boolean) {
    person.isInfected = isInfected;
    if (isInfected) {
        person.material.color = new THREE.Color('red')
    }

}
