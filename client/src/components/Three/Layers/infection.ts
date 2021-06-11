import {distance, incidence, infectionRate, maskWear, timeInfection} from "../../../store";
import type {Object3DCustom} from "../../../types";

import * as THREE from "three";

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
         person.isInfected = person.isIncidenceInfected;
     }


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

export function setInfection(person: Object3DCustom, isInfected: boolean) {
    person.isInfected = isInfected;
    if (isInfected) {
        person.material.color = new THREE.Color('red')
    }

}
