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
      position = (position - distance + 100) % 100;
    } else if (direction === "R") {
      position = (position + distance) % 100;
    }

    if (position === 0) {
      count++;
    }
  }
  return count;
}

safePassword().then((result: number) => {
  console.log("the Password is:", result);
});