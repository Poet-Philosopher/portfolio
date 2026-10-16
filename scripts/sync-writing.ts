/**
 * Regenerates src/data/writing-fallback.json from the live Substack feed.
 * Runs automatically before `next build` and on demand via `npm run sync-writing`.
 * If the feed cannot be read, the existing snapshot is kept and the script still exits 0
 * so a Substack outage never blocks a deploy. Use --strict to make it fail instead.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fetchFeed } from "../src/lib/feed";

const strict = process.argv.includes("--strict");
const target = path.join(process.cwd(), "src", "data", "writing-fallback.json");

async function main() {
  try {
    const feed = await fetchFeed(0);
    if (feed.essays.length === 0) throw new Error("Feed returned no essays");
    const snapshot = {
      syncedAt: new Date().toISOString(),
      channel: feed.channel,
      essays: feed.essays.slice(0, 30),
    };
    await writeFile(target, `${JSON.stringify(snapshot, null, 2)}\n`);
    console.log(`[sync-writing] saved ${snapshot.essays.length} essays to src/data/writing-fallback.json`);
  } catch (error) {
    console.warn("[sync-writing] could not read the feed; keeping the existing snapshot.", error);
    if (strict) process.exit(1);
  }
}

main();
