import { getAocInput } from "./utils/aoc-input";

async function dbSanitizer(): Promise<number> {
    const text: string = await getAocInput(2);
    const ranges: string[] = text.trim().split(",");


    // helper function for odd digit length IDs (automatically safe)
    function hasOddLength(num: number): boolean {
        return num.toString().length % 2 !== 0;
    }

    // helper function to check if each ID is valid
    function isInvalidId(id: number): boolean {
       const str: string = id.toString();
       const len = str.length;

       if (len % 2 !== 0) return false;

       const halfLen = len / 2;
       const firstHalf = str.slice(0,halfLen);
       const secondHalf = str.slice(halfLen);

       return firstHalf === secondHalf;
    }

    const invalidIds: number[] = [];


    for (const range of ranges) {
        const [start = 0, end = 0]: number[] = range.split("-").map(Number);
        for (let id: number = start; id <= end; id++) {
            if (hasOddLength(id)) {
                continue;
            }

            if (isInvalidId(id)) {
                invalidIds.push(id);
            }
        }
        
    }
    
    const sum = invalidIds.reduce((total, id) => total + id, 0);
    return sum;
}


dbSanitizer().then((sum: number) => {
    console.log("The sum of all invalid IDs in db is:", sum)
})