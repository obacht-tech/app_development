import h337 from './heatmap_script.js'
import type {HeatmapPoint, PersonSpline} from "../../../types";


export function initHeatmap(people: PersonSpline[]) {
    let heatmapInstance = h337.create({
        container: document.querySelector('.heatmap'),
        maxOpacity: .6,
        radius: 10,
        blur: .80,
    });

    const points: HeatmapPoint[] = [];
    for (let i = 0; i <people.length; i++) {
        for (let position of people[i].splineData) {
            const point: HeatmapPoint = {

                x:  Math.floor(position.x*100+500),
                y:  Math.floor(position.y*100+500)
            }
            points.push(point)
        }
    }

    const result = Object.values(points.reduce((r, e) => {
        let k = `${e.x}|${e.y}`;
        if(!r[k]) r[k] = {...e, value: 1}
        else r[k].value += 1;
        return r;
    }, {}))

    heatmapInstance.setData({
        data: result
    });
}

