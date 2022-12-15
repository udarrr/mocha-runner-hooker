export class GlobalHelper {
    public static sendObjectToGlobalStorage(obj: any, objName: string): void {
        try {
            (global as any).globalThis = global;
            (globalThis as any)[objName] = obj;
        } catch (error) {
            console.log(error.message);
        }
    }

    public static takeObjFromGlobalStorage(objName: string): any {
        try {
            (global as any).globalThis = global;

            if ((globalThis as any)[objName] !== undefined) {
                return (globalThis as any)[objName];
            } else {
                return '';
            }
        } catch (error) {
            console.log(error.message);
            return '';
        }
    }
}
