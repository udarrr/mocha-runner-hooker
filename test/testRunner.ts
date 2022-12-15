import {RunnerHelper} from '../src/hooker';

RunnerHelper.runner([
    {
        hookType: 'before all',
        hookTitle: 'skip option',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from before');
        },
    },
    {
        hookType: 'after all',
        hookTitle: 'skip option',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from after');
        },
    },
    {
        hookType: 'after each',
        hookTitle: 'skip option',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from after each');
        },
    },
    {
        hookType: 'before each',
        hookTitle: 'skip option',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from before each');
        },
    },
]);
