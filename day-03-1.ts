import { getAocInput } from "./utils/aoc-input";

async function batteryOptimizer (): Promise<number> { 
    const text = await getAocInput(3);
    const banks = text.split("\n");

    
    function maxTwoDigit(bank: string): number {
        // this is a check for theoritical faulty bank
        if (bank.length < 2) return parseInt(bank) || 0;

        let bestJoltage: number = 0;
        for (let i = 0; i < bank.length; i++) {
            for (let j = i + 1; j < bank.length; j++) {
            const candidate = parseInt(bank.charAt(i)) * 10 + parseInt(bank.charAt(j));
            if (candidate > bestJoltage) {
                bestJoltage = candidate;
            }
            }
        }
        return bestJoltage;
    }

    const joltages: number[] = [];
    for (let bank of banks)  {
        joltages.push(maxTwoDigit(bank));
    }

    const total: number = joltages.reduce((sum, joltage) => sum + joltage, 0);

    return total;
}

batteryOptimizer().then((sum: number)=> console.log("Total output joltage is:", sum));

console.log("hey");