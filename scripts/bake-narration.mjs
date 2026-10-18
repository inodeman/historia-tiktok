import { mkdir, writeFile } from "node:fs/promises";
import { chapters } from "../src/data/documentary.ts";

const key = process.env.XAI_API_KEY;
if (!key) {
  console.error("missing key");
  process.exit(1);
}

await mkdir("public/narration", { recursive: true });

for (const chapter of chapters) {
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: chapter.narration,
      voice_id: "orion",
      language: "es",
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    console.error(chapter.id, res.status, detail.slice(0, 300));
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const path = `public/narration/${chapter.id}.mp3`;
  await writeFile(path, buf);
  console.log(chapter.id, buf.length);
}
