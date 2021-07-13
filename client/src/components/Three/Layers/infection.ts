/**
 * Distance Logic
 * Developer: Silvia Tosato
 */
import {distance} from "../../../store";
import type {Object3DCustom} from "../../../types";
import type {PersonSpline} from "../../../types";

let distanceValue;

distance.subscribe((value) => {
    distanceValue = value.new;
})

/**
 * gives back a boolean value depending on given percantage
 *
 * @export
 * @param {number} percentage
 * @return {*}  {boolean}
 */
export function percentBool(percentage: number): boolean {
    const r = Math.random();
    return r * 100 < percentage;
}


/**
 *  Distance calculation:
 * how many people were colliding with others in a timerange
 *
 * @export
 * @param {Object3DCustom[]} people
 * @param {number} radius
 * @param {number} start
 * @param {number} end
 * @return {*}  {number}
 */
export function updateDistances(people: PersonSpline[], radius: number, start: number, end: number): number {
    let collidingPeople = [];
    for (let i = start; i <= end; i++) {
        for (let personI = 0; personI < people.length; personI++) {
            if (people[personI].timePosition <= i && (i - people[personI].timePosition <= people[personI].timeDelta)) {
                let isColliding = false;
                for (let person2 of people) {
                    if ((people[personI].pid !== person2.pid) && (person2.timePosition <= i && (i - person2.timePosition <= person2.timeDelta))) {
                        const mom = i - people[personI].timePosition
                        const posPerson1 = people[personI].spline.getPoint(mom > 0 ?((i - people[personI].timePosition) / people[personI].timeDelta):0);
                        const posPerson2 = person2.spline.getPoint(mom > 0 ?((i - people[personI].timePosition) / people[personI].timeDelta):0);
                        const dx = posPerson1.x - posPerson2.x;
                        const dy = posPerson1.y - posPerson2.y;
                        const resultDistance = Math.sqrt(dx * dx + dy * dy);
                        isColliding = resultDistance <= radius * 2;
                        if (isColliding) {
                            break;
                        }
                    }
                }
                if (isColliding) {
                    collidingPeople.push(people[personI].pid)
                }
            }

        }
    }
  // delete all duplicates
    console.log(collidingPeople.length)
    let uniqueColliding = [...new Set(collidingPeople)];
    return uniqueColliding.length;
}

