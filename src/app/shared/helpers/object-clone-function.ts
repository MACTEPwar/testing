export function CloneObject<T = any>(o: object): T {
    return JSON.parse(JSON.stringify(o)) as T;
}
