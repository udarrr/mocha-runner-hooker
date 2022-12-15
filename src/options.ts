import {GlobalHelper} from './globalHelper';

export class Options {
    // eslint-disable-next-line @typescript-eslint/typedef
    public static skipOption = {
        initHookFn: async function () {
            GlobalHelper.sendObjectToGlobalStorage(false, 'isFailed');
        },
        finishHookFn: async function () {
            GlobalHelper.sendObjectToGlobalStorage(false, 'isFailed');
        },
        afterEachHookFn: async function () {
            const error = GlobalHelper.takeObjFromGlobalStorage('testError');

            const sendIsFailedTag = async () => {
                await new Promise((res, rej) => {
                    setTimeout(() => {
                        res('done');
                    }, 3000);
                });
                GlobalHelper.sendObjectToGlobalStorage(true, 'isFailed');
            };

            if (
                //@ts-ignore
                this.currentTest &&
                //@ts-ignore
                this.currentTest.state === 'failed'
            ) {
                //@ts-ignore
                if (this.currentTest.err) {
                    if (
                        //@ts-ignore
                        this.currentTest.err.stack &&
                        //@ts-ignore
                        !this.currentTest.err.stack.includes('AssertionError')
                    ) {
                        await sendIsFailedTag();
                    }
                } else if (error) {
                    if (error.stack && !error.stack.includes('AssertionError')) {
                        await sendIsFailedTag();
                    }
                } else {
                    await sendIsFailedTag();
                }
            }
        },
        beforeEachHookFn: async function () {
            if (GlobalHelper.takeObjFromGlobalStorage('isFailed')) {
                await new Promise((res, rej) => {
                    setTimeout(() => {
                        res('done');
                    }, 1000);
                });
                //@ts-ignore
                this.skip();
            }
        },
    };
}
