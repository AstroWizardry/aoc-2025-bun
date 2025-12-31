import {getAocInput} from './utils/aoc-input';

const text: string = await getAocInput(4);
const grid: string[][] = text.trim().split('\n').map(line => line.split(''));

async function removableRolls(): Promise<number> {
    function adjacentRolls(grid: string[][], row: number, col: number): number {
        if (!grid || grid.length === 0 || !grid[0]) return 0;
        let count = 0;

        const rows: number = grid.length
        const cols: number = grid[0].length;

        const directions: number[][] = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],  /* @ */  [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for  (const [dr = 0, dc = 0] of directions) {
            const dRow: number = row + dr;
            const dCol: number = col + dc;

            if (dRow >= 0 && dRow < rows &&
                dCol >= 0 && dCol < cols) {
                    if (grid[dRow]![dCol] === "@") count++;
                    }
                }
                return count;
            }

            let totalRemoved: number = 0;
            let hasChanges: boolean = true;


            // This will scan the entire grid and removes @ till there no changes
            while(hasChanges) {
                hasChanges = false;
                const toRemove: [number, number][] = [];

                for (let row = 0; row < grid.length; row++) {
                    for (let col = 0; col < grid[row]!.length; col++) {
                        if (grid[row]![col] === '@') {
                            const adjacentCount = adjacentRolls(grid, row, col);
                            if (adjacentCount < 4) {
                                toRemove.push([row, col]);
                            }
                        }
                    }
                }
                for (const [row, col] of toRemove) {
                    grid[row]![col] = '.';
                    totalRemoved++;
                    hasChanges = true;
                }
            }

        return totalRemoved;
};

removableRolls().then((sum: number) => console.log("Number of removable rolls are:", sum));