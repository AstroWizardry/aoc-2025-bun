import { getAocInput } from './utils/aoc-input';

async function main() {
    const input = await getAocInput(5);
    const [strIdRanges, strIds] = input.split('\n\n') as [string, string];

    const ranges: Array<[number, number]> = [];
    for (const line of strIdRanges.split('\n')) {
        if (line.trim().length === 0) continue;
        const [start, end] = line.split('-').map(Number) as [number, number];
        ranges.push([start, end]);
    }

    const ids = strIds.split('\n').map(Number);

    function mergedRanges(ranges: Array<[number, number]>) {
        if (ranges.length === 0) return [];

        const sorted: Array<[number, number]> = [...ranges].sort((a, b) => 
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
        );
        const merged: Array<[number, number]> = [];
        let current: [number, number] = [...sorted[0]!];

        for (let i = 1; i < sorted.length; i++) {
            const [start, end] = sorted[i]!;
            if (start <= current[1]! + 1) {
                current[1] = Math.max(current[1]!, end);
            } else {
                merged.push([...current]);
                current = [start, end];
            }
        }
        merged.push(current);
        return merged;
    }

    function isInAnyRange(mergedRanges: Array<[number, number]>, n: number): boolean {
        let low = 0;
        let high = mergedRanges.length - 1;
    
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const [start, end] = mergedRanges[mid]!;
    
            if (n < start) {
                high = mid - 1;
            } else if (n > end) {
                low = mid + 1;
            } else {
                return true;  // Found in this range
            }
        }
        return false;
    }
    
    const mergeRanges = mergedRanges(ranges);
    let freshCount = 0;
    for (const id of ids) {
        if (isInAnyRange(mergeRanges, id)) {
            freshCount++;
        }
    }

    return freshCount;
}

main().then(result => console.log('The number of fresh ingredient id is: ' + result));