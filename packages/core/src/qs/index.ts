export type QsValue = string | string[] | undefined | null;
export function parse(str: string) {
    const searchParams = new URLSearchParams(str);
    const result = {} as Record<string, string | string[]>;
    for (const [key, value] of searchParams) {
        if (value == undefined) continue;
        const isArray = value.includes(',');
        result[key as string] = isArray ? value.split(',') : value;
    }
    return result;
}

export function stringify(obj: Record<string, QsValue>, prefix = '?') {
    const searchParams = new URLSearchParams();
    for (const key in obj) {
        const value = obj[key];
        if (value == undefined) continue;
        searchParams.set(key, Array.isArray(value) ? value.join(',') : value);
    }
    return prefix + searchParams.toString();
}
