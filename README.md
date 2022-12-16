# mocha-runner-hooker

![Released](https://github.com/udarrr/mocha-runner-hooker/workflows/Create%20tagged%20release/badge.svg)

## Simple hooker for mocha

### Installation

```javascript
npm i mocha-runner-hooker
```

### The main idea we could add to describe, as much some types hooks as we want and they are going to be executed in orded as were added

- No necessary add repeated hooks in each test just do it once in mocha-runner-hooker.
- Or add new functionality for all your 1000 test cases through mocha-runner-hooker
- Works with top level and nested describes (isTopLevelSuiteIncluded option)
- Supported globalSetup functions array (the same like hooks)
- Supported globalTeardown functions array (the same like hooks)
- Supported custom reporter and substring title filter for describes

## Add new hooks to runner

```javascript
//testRunner.js
import {RunnerHelper} from 'mocha-runner-hooker';

RunnerHelper.runner([
    {
        hookType: 'before all',
        hookTitle: 'hello',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from before');
        },
    },
    {
        hookType: 'after all',
        hookTitle: 'hello',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from after');
        },
    },
    {
        hookType: 'after each',
        hookTitle: 'hello',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from after each');
        },
    },
    {
        hookType: 'before each',
        hookTitle: 'hello',
        order: 'Top',
        hookFn: () => {
            console.log('Hello from before each');
        },
    },
]);
```

and just add path to file with runner in your package.json scripts

```json
 "testRunner": "mocha ./testRunner.js ./tests/test.js --no-exit || exit 0",
```

skip runner already was prepared (skip all it in describe if one was failed)

```json
 "testSkipRunner": "mocha ./node_modules/mocha-runner-hooker/skipRunner.js ./test/test.js --no-exit || exit 0",
```

## API

```Typescript
interface Runner {
    hooks: Array<HookType> | null;
    globalSetup?: Array<{argsThis: any; fn: () => any}> | null;
    globalTeardown?: Array<{argsThis: any; fn: () => any}> | null;
    options?: {
        reporter?: any;
        titleIdFilter?: Array<string>;
        isTopLevelSuiteIncluded?: boolean;
    };
}

type HookType = {
    hookType: 'before all' | 'before each' | 'after each' | 'after all';
    hookTitle: string;
    order: 'Top' | 'Bottom';
    hookFn: () => any;
};
```
