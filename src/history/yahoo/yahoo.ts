import * as yf from 'yahoo-finance';
import * as path from 'path';
import * as moment from 'moment';
import {fromJS, List} from 'immutable';

const START_DATE = moment('1995-01-01');

const yahoo = (symbol: string) => (from: string) => (to: string) => (period: string) => new Promise((resolve, reject) => {
    yf.historical({symbol, from, to, period}, (err, res) => {
        if (err) {
            return reject(err);
        }
        return resolve(res);
    })
});


export async function download(symbol: string): Promise<List<any>> {
    const results = await yahoo(symbol)(START_DATE.format('YYYY-MM-DD'))(moment().format('YYYY-MM-DD'))('d');
    return List(fromJS(results)).sort((a: any, b: any) => {
        return moment(a.get('date')).isBefore(moment(b.get('date'))) ? -1 : 1;
    }).toList();
}