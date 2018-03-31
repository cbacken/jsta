import * as yf from 'yahoo-finance';
import * as path from 'path';
import * as moment from 'moment';
import { fromJS, List, Map } from 'immutable';
import { Observable } from 'rxjs';

const START_DATE = moment('1995-01-01').format('YYYY-MM-DD');
const TODAY = moment().format('YYYY-MM-DD');

const yahooObservable = (symbol: string, from: string = START_DATE, to: string = TODAY, period: string = 'd') => {
    const yahooFinance: any = Observable.bindNodeCallback(yf.historical);
    return yahooFinance({ symbol, from, to, period });
}

export function download(symbol: string) {
    return Observable.create((observer) => {
        yahooObservable(symbol).subscribe(results => {
            try {
                console.log(`Downloading ${symbol}`);
                observer.next(Map({
                    symbol,
                    quotes: List(fromJS(results)).sort((a: any, b: any) => {
                        return moment(a.get('date')).isBefore(moment(b.get('date'))) ? -1 : 1;
                    })
                }));
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        });
    });
}