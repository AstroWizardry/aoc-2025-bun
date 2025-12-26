import { getAocInput } from './utils/aoc-input'

async function safePassword2(): Promise<number> {
  const text: string = await getAocInput(1);
  const lines: string[] = text.trim().split("\n");

  let position: number = 50;
  let count: number = 0;

  for (const line of lines) {
    const direction: string | undefined = line[0];
    const distance: number = parseInt(line.slice(1), 10);

    if (direction === "L") {      
      for (let i: number = 0; i < distance; i++) {
        position = (position - 1 + 100) % 100;
        if (position === 0) count++;
      }
    } else if (direction === "R") {
      for (let i: number = 0; i < distance; i++) {
        position = (position + 1) % 100;
        if (position === 0) count++;
      }
    }
  }
  return count;
}

safePassword2().then((result: number) => {
  console.log("In that case the password is:", result)
})
