import { getAocInput } from "./utils/aoc-input";

async function safePassword(): Promise<number> {
  const text: string = await getAocInput(1);
  const lines: string[] = text.trim().split("\n").filter((line): line is string => line.length > 0);

  let position: number = 50;
  let count: number = 0;

  for (const line of lines) {
    const direction: string | undefined = line[0];
    const distance: number = parseInt(line.slice(1), 10);

    if (direction === "L") {
      if (position >= distance) {
        position = position - distance;
      } else {
        position = (position - distance + 100) % 100;
      }
    } else if (direction === "R") {
      const newPos = position + distance;
      if (newPos < 100) {
        position = newPos;
      } else {
        position = newPos % 100;
      }
    }
    if (position === 0) {
      count++;
    }
  }
  return count;
}

const startTime = performance.now();
safePassword().then((result: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log("the Password is:", result);
  console.log(`Execution time: ${duration.toFixed(3)}ms`);
});

