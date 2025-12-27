import { getAocInput } from './utils/aoc-input'

async function safePassword2(): Promise<number> {
  const text: string = await getAocInput(1);
  const lines: string[] = text.trim().split("\n").filter((line): line is string => line.length > 0);

  let position: number = 50;
  let count: number = 0;

  for (const line of lines) {
    const direction: string | undefined = line[0];
    const distance: number = parseInt(line.slice(1), 10);

    if (direction === "L") {
      const startPos = position;
      position = (position - distance + 100) % 100;
      
      const minK = Math.ceil((startPos - distance) / 100);
      const maxK = Math.floor((startPos - 1) / 100);
      if (minK <= maxK) {
        count += maxK - minK + 1;
      }
    } else if (direction === "R") {

      const startPos = position;
      position = (position + distance) % 100;

      const minK = Math.ceil((startPos + 1) / 100);
      const maxK = Math.floor((startPos + distance) / 100);
      if (minK <= maxK) {
        count += maxK - minK + 1;
      }
    }
  }
  return count;
}

const startTime = performance.now();
safePassword2().then((result: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log("In that case the password is:", result);
  console.log(`Execution time: ${duration.toFixed(3)}ms`);
})
