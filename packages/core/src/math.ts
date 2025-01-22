export function rand (min: number, max: number, int?: boolean) {
    const r = Math.random() * (max - min) + min;
    return int ? Math.floor(r) : r;
};
