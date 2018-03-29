import {List} from 'immutable';

const round = n => Math.round((n * 100)) / 100;

export function simpleMovingAverage(series: List<number>, period: number = 1): List<number> {
    let i = 0, s = 0, ma = 0, out = [];
    series.map(d => {
        s += isNaN(d) ? 0 : d;
        if (i < period - 1) {
            ma = NaN;
        } else if (i + 1 === period) {
            ma = round(s / period);
        } else {
            s -= isNaN(series.get(i - period)) ? 0 : series.get(i - period);
            ma = round(s / period);
        }
        // console.log(`d: ${d} s: ${s} sma: ${ma}`);
        out.push(ma);
        i++;
    });
    return List(out);
}