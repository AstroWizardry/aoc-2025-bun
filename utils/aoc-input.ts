import type { BunFile, HeadersInit } from 'bun';

export async function getAocInput(day: number): Promise<string> {
    const repoUrl: string = Bun.env.REPO_URL ?? 'YOUR_REPO_URL_HERE';
    const userAgent: string = `aoc-2025-bun/1.0 (${repoUrl})` || 'aoc-solver';

    const sessionCookie: string = Bun.env.AOC_SESSION_COOKIE ?? 'YOUR_SESSION_COOKIE_HERE';

    if (!sessionCookie || sessionCookie === 'YOUR_SESSION_COOKIE_HERE') {
        throw new Error(
            "AOC_SESSION_COOKIE is not set" +
            "Please set the session cookie in the .env file" +
            "or environment variable kono sussy baka (`ー´)!!!"
        );
    }

    const url: string = `https://adventofcode.com/2025/day/${day}/input`;
    const headers: HeadersInit = {
        "Cookie": `session=${sessionCookie}`,
        'User-Agent': userAgent,
    }

    try {
        const response: Response = await fetch(url, { headers });        
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        const text: string = await response.text();

        if(!text) {
            throw new Error('Invalid response from API');
        }

        return text.trimEnd()
    } catch (error) {
        const dayPadded: string = day.toString().padStart(2, '0');
        const localFilePath: string = `inputs/day-${dayPadded}.txt`;
        try {
            const file: BunFile = Bun.file(localFilePath);
            const text: string = await file.text();
            return text.trimEnd();
        } catch (fileError) {
            throw new Error(
                `Failed to fetch input from API and local file not found at ${localFilePath}. ` +
                `Original error: ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }
}