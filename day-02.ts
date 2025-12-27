import { getAocInput } from "./utils/aoc-input";

async function dbSanitizer(): Promise<number> {
    const text: string = await getAocInput(2);
    const ranges: string[] = text.trim().split(",");

    // helper function to count digits using logarithm
    function countDigits(num: number): number {
        if (num === 0) return 1;
        return Math.floor(Math.log10(num)) + 1;
    }

    // helper function for odd digit length IDs (automatically safe)
    function hasOddLength(num: number): boolean {
        return num.toString().length % 2 !== 0;
    }

    // helper function to check if each ID is valid
    function isInvalidId(id: number): boolean {
        const totalDigit: number = countDigits(id);

        if (totalDigit % 2 !== 0) return false;

        const halfDigits: number = totalDigit / 2;
        const divisor = Math.pow(10, halfDigits);

        const firstHalf = Math.floor(id / divisor);
        const secondHalf = id % divisor;

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