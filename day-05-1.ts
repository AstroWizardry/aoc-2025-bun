import { getAocInput } from './utils/aoc-input';

async function main() {
    const input = await getAocInput(5) as string;
    const [strIdRanges, strIds] = input.split('\n\n') as [string, string];

    const ranges: Array<[number, number]> = [];
    for (const line of strIdRanges.split('\n')) {
        if (line.trim().length === 0) continue;
        const [start, end] = line.split('-').map(Number) as [number, number];
        ranges.push([start, end]);
    }

    const ids: number[] = strIds.split('\n').map(Number);
    let result: number = 0

    for (const id of ids) {
        const isFresh = ranges.some(([start, end]) => id >= start && id <= end);
        if (isFresh) result++;
    }
    return result;
    
}

main().then((result: number) => console.log('The number of fresh ingredient id is: ' + result));