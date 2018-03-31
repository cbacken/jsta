import { download } from './history/yahoo'
import { fromJS, List, Map } from 'immutable';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';
import { bufferCount } from 'rxjs/operator/bufferCount';

const config = require('../config/dev.json');

const writeFileObserver = (path: string, data: any) => {
    const writeFile: any = Observable.bindNodeCallback(fs.writeFile);
    return writeFile(path, data);
};

const bootstrap = (tickers: List<string>, concurrency: number = 1) => {
    Observable.from(tickers.toArray()).map(t => t)
        .bufferCount(concurrency)
        .concatMap(t => Observable.from(t).mergeMap(t => download(t)))
        .subscribe((data: any) => {
            //console.log(data.toJS());
            writeFileObserver(path.normalize(path.join(config.download, data.get('symbol')) + '.json'),
                JSON.stringify(data.toJS())).subscribe();
        });
};

bootstrap(List(fromJS(config.tickers)), 2);