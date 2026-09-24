import { createFileRoute } from "@tanstack/react-router";
import { OccasionPage, occasionHead } from "@/components/occasion-page";
import { getOccasion } from "@/lib/occasions";

const o = getOccasion("villas-poolside");

export const Route = createFileRoute("/occasions/villas-poolside")({
  head: () => occasionHead(o),
  component: VillasPage,
});

function VillasPage() {
  return <OccasionPage o={o} />;
}
