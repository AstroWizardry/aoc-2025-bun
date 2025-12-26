import type { BunFile } from "bun";

async function safePassword(): Promise<number> {
  const file: BunFile = Bun.file("inputs/day-01.txt");
  const text: string = await file.text();
  const lines: string[] = text.trim().split("\n");

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
