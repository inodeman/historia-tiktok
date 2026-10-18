import { createFileRoute } from "@tanstack/react-router";
import { Theater } from "@/components/theater";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARA TI — La historia de TikTok" },
      {
        name: "description",
        content:
          "Documental en formato YouTube sobre la historia de TikTok: de la servilleta de 2012 al apagón y la venta de 2026. inodeAI.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <Theater />;
}
