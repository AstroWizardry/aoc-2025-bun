import { getAocInput } from './utils/aoc-input';

async function main() {
    const input = await getAocInput(5);
    const [strIdRanges, strIds] = input.split('\n\n') as [string, string];

    // Optimized my data sanitization
    const ranges: Array<[number, number]> = [];
    let rangeStart = 0;
    let rangeEnd = strIdRanges.indexOf('\n', rangeStart);
    
    while (rangeEnd !== -1) {
        const line = strIdRanges.slice(rangeStart, rangeEnd);
        if (line.trim().length > 0) {
            const dashIndex = line.indexOf('-');
            const start = Number(line.slice(0, dashIndex));
            const end = Number(line.slice(dashIndex + 1));
            ranges.push([start, end]);
        }
        rangeStart = rangeEnd + 1;
        rangeEnd = strIdRanges.indexOf('\n', rangeStart);
    }
    
    // Handle last line if no trailing newline
    const lastLine = strIdRanges.slice(rangeStart);
    if (lastLine.trim().length > 0) {
        const dashIndex = lastLine.indexOf('-');
        const start = Number(lastLine.slice(0, dashIndex));
        const end = Number(lastLine.slice(dashIndex + 1));
        ranges.push([start, end]);
    }

    // Optimized ID parsing - single pass with manual parsing
    const ids: number[] = [];
    let idStart = 0;
    let idEnd = strIds.indexOf('\n', idStart);
    
    while (idEnd !== -1) {
        const idStr = strIds.slice(idStart, idEnd);
        if (idStr.trim().length > 0) {
            ids.push(Number(idStr));
        }
        idStart = idEnd + 1;
        idEnd = strIds.indexOf('\n', idStart);
    }
    
    // Handle last ID if no trailing newline
    const lastId = strIds.slice(idStart);
    if (lastId.trim().length > 0) {
        ids.push(Number(lastId));
    }

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