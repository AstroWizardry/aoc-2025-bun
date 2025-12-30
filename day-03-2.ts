import { getAocInput } from "./utils/aoc-input";
const TARGET_LENGTH: number = 12;

async function bigBatteryOptimizer(): Promise<number> {
    const text = await getAocInput(3);
    const banks = text.split("\n");

    function maxTwelveDigit(bank: string): number {
        const stack: string[] = [];
        const toRemove: number = bank.length - TARGET_LENGTH;
        let removed: number = 0;

        for (const battery of bank) {
            while (stack.length > 0 && stack[stack.length - 1]! < battery && removed < toRemove) {
                stack.pop();
                removed++;
            }
            stack.push(battery);
        }

        // keep removing till we reach 12
        while (stack.length > TARGET_LENGTH) {
            stack.pop();
        }

        return Number(stack.join(''));
    }
    let joltages: number[] = [];
    for (const bank of banks) {
        joltages.push(maxTwelveDigit(bank));
    }

    const total: number = joltages.reduce((sum, joltage) => sum + joltage, 0);

    return total;
}


bigBatteryOptimizer().then((sum: number) => console.log("Total output joltage is:", sum));
