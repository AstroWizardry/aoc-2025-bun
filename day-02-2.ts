import { getAocInput } from "./utils/aoc-input";

async function dbSanitizerImproved(): Promise<number> {
    const text: string = await getAocInput(2);
    const ranges: string[] = text.trim().split(",");

    function isInvalidIdImproved(id: number): boolean {
        const str = id.toString();
        const len = str.length;

        for (let repeated = 2; repeated <= len; repeated++) {
            // this is good check to skips unecessary checking of some unresonable length 
            if (len % repeated !== 0) continue;

            const segmentLength = len / repeated;
            const firstSegment = str.slice(0, segmentLength);

            let allMatch = true;
            for (let i = 1; i < repeated; i++) {
                const segment = str.slice(i * segmentLength, (i + 1) * segmentLength);
                if (segment !== firstSegment) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) return true;
        }
        return false;
    }

    const invalidIds: number[] = [];

    for (const range of ranges) {
        const [start = 0, end = 0] = range.split("-").map(Number);

        for (let id: number = start; id <= end; id++) {
            if(isInvalidIdImproved(id)) {
                invalidIds.push(id);
            }
        }
    }

    const sum = invalidIds.reduce((total, id) => total + id, 0);
    return sum;
}

dbSanitizerImproved().then((sum: number) => {
    console.log("The new and improved sum of all invalid IDs in db is:", sum);
})