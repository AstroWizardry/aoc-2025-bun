import type { HeadersInit } from 'bun';

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

    const response: Response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text: string = await response.text();
    return text.trimEnd();
}
