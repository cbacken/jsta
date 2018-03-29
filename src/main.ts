import {download} from './history/yahoo'
import * as moment from 'moment';

const bootstrap = async () => {
    const blah = await download('AAPL');
    console.log(blah.toJS());
}

bootstrap().catch(console.log);