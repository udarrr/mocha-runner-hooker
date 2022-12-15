import {Hook} from 'mocha';
const Runner = require('mocha/lib/runner');
const Mocha = require('mocha/lib/mocha');
const originalRun = Runner.prototype.run;
const originalMocha = Mocha.prototype.run;

export type HookType = {
    hookType: 'before all' | 'before each' | 'after each' | 'after all';
    hookTitle: string;
    order: 'Top' | 'Bottom';
    hookFn: () => any;
};

export class RunnerHelper {
    private static async addHooks(suites: any, isTopLevelSuiteIncluded?: boolean, ...hooks: Array<HookType>) {
        let hooksInited: Array<{order: 'Top' | 'Bottom'; hook: Hook}> = [];

        for (let hook of hooks) {
            hooksInited.push({order: hook.order, hook: new Hook(`${hook.hookType} ${hook.hookTitle}`, hook.hookFn)});
        }

        const setHooks = (...suites: Array<any>) => {
            for (let suiteWithHook of suites) {
                for (let customHook of hooksInited) {
                    customHook.hook.ctx = suiteWithHook.ctx;
                    customHook.hook.parent = suiteWithHook;
                    customHook.hook.file = suiteWithHook.file;
                    customHook.hook.timeout(0);

                    if (customHook.hook.title.includes('before all')) {
                        if (customHook.order === 'Top') {
                            suiteWithHook._beforeAll.push(customHook.hook);
                        } else if (customHook.order === 'Bottom') {
                            suiteWithHook._beforeAll.unshift(customHook.hook);
                        }
                    }
                    if (customHook.hook.title.includes('before each')) {
                        if (customHook.order === 'Top') {
                            suiteWithHook._beforeEach.push(customHook.hook);
                        } else if (customHook.order === 'Bottom') {
                            suiteWithHook._beforeEach.unshift(customHook.hook);
                        }
                    }
                    if (customHook.hook.title.includes('after each')) {
                        if (customHook.order === 'Top') {
                            suiteWithHook._afterEach.push(customHook.hook);
                        } else if (customHook.order === 'Bottom') {
                            suiteWithHook._afterEach.unshift(customHook.hook);
                        }
                    }
                    if (customHook.hook.title.includes('after all')) {
                        if (customHook.order === 'Top') {
                            suiteWithHook._afterAll.push(customHook.hook);
                        } else if (customHook.order === 'Bottom') {
                            suiteWithHook._afterAll.unshift(customHook.hook);
                        }
                    }
                }
            }
        };
        this.setHooksForNestedSuitesRecursion(suites, setHooks, isTopLevelSuiteIncluded ? isTopLevelSuiteIncluded : false);

        return suites;
    }

    private static setHooksForNestedSuitesRecursion(suites: any, setHooksFn: (...suites: Array<any>) => void, isTopDescribeIncluded?: boolean) {
        for (let entireSuite of suites) {
            if (entireSuite.suites && entireSuite.suites.length > 0) {
                if (isTopDescribeIncluded) {
                    setHooksFn(entireSuite);
                }
                this.setHooksForNestedSuitesRecursion(entireSuite.suites, setHooksFn);
            } else {
                setHooksFn(entireSuite);
            }
        }
        return suites;
    }

    public static runner(
        hooks: Array<HookType> | null,
        globalSetup?: Array<{argsThis: any; fn: () => any}> | null,
        globalTeardown?: Array<{argsThis: any; fn: () => any}> | null,
        options?: {
            reporter?: any;
            titleIdFilter?: Array<string>;
            isTopLevelSuiteIncluded?: boolean;
        },
    ) {
        Mocha.prototype.run = async function (done: any) {
            if (options?.reporter) {
                this._reporter = options?.reporter;
            }

            if (globalSetup && globalSetup.length) {
                for (let glb of globalSetup) {
                    this.options.globalSetup.push(glb.fn.bind(glb.argsThis));
                }
            }
            if (globalTeardown && globalTeardown.length) {
                for (let glb of globalTeardown) {
                    this.options.globalTeardown.push(glb.fn.bind(glb.argsThis));
                }
            }
            originalMocha.call(this, done);
        };

        Runner.prototype.run = async function (done: any) {
            if (hooks && hooks.length) {
                for (let hook of hooks) {
                    this.suite.suites = await RunnerHelper.addHooks(this.suite.suites, options?.isTopLevelSuiteIncluded, hook);
                    this._opts.cleanReferencesAfterRun = false;
                }
            }
            if (options?.titleIdFilter && options?.titleIdFilter.length) {
                for (let str of options?.titleIdFilter) {
                    const setSuites = async (substring: any) => {
                        this.suite.suites = this.suite.suites.filter((item: any) => {
                            if (item.suites.length) {
                                item.suites = item.suites.filter((suit: any) => suit.title.includes(substring));
                                return item.suites.length;
                            }
                            return item.title.includes(substring);
                        });
                    };
                    await setSuites(str);
                }
            }
            originalRun.call(this, done);
        };
    }
}
