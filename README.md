# mocha-runner-hooker

## Simple hooker for mocha

### Installation

```javascript
npm i mocha-runner-hooker
```

### The main idea we could add to describe, as much some types hooks as we want and they are going to be executed in orded as were added

-   No necessary add repeated hooks in each test just do it once in mocha-runner-hooker.
-   Or add new functionality for all your 1000 test cases through mocha-runner-hooker

```javascript
//without mocha-runner-hooker
describe('Suite', function () {
    it('1', async () => {
        console.log('test 1');
    });
});
```

```javascript
//with mocha-runner-hooker
describe('Suite', function () {
    before(async function () {}); //on fly
    before(async function () {}); //on fly
    beforeEach(async function () {}); //on fly
    afterEach(async function () {}); //on fly
    after(async function () {}); //on fly
    after(async function () {}); //on fly

    it('1', async () => {
        console.log('test 1');
    });
});
```

## Add new hooks to runner

```javascript
//testRunner.js or .ts
import {RunnerHelper} from 'mocha-runner-hooker';

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
```

and just add path to file with runner in your package.json scripts

```json
 "testRunner": "mocha ./runners/testRunner.js ./test/test.js --no-exit || exit 0",
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
