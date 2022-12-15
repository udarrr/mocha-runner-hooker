import {RunnerHelper} from './src/hooker';
import {Options} from './src/options';

export default RunnerHelper.runner([
    {hookType: 'before all', hookTitle: 'skip option', order: 'Top', hookFn: Options.skipOption.initHookFn},
    {hookType: 'after all', hookTitle: 'skip option', order: 'Top', hookFn: Options.skipOption.finishHookFn},
    {hookType: 'after each', hookTitle: 'skip option', order: 'Top', hookFn: Options.skipOption.afterEachHookFn},
    {hookType: 'before each', hookTitle: 'skip option', order: 'Top', hookFn: Options.skipOption.beforeEachHookFn},
]);
