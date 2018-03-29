import {simpleMovingAverage} from './ma';
import {List} from 'immutable';

describe('Moving Average', () => {
    describe('Simple Moving Average', () => {
        it('should return an array of moving averages', async () => {
            const series = simpleMovingAverage(List([1,2,3,4,5]), 3);
            expect(series.toJS()).toEqual([ NaN, NaN, 2, 3, 4 ]);

            const series2 = simpleMovingAverage(List([1,51,2,41,3,31,4,21,5,11,6,1]), 2);
            expect(series2.toJS()).toEqual([ NaN, 26, 26.5, 21.5, 22, 17, 17.5, 12.5, 13, 8, 8.5, 3.5 ]);
        });
    });
});