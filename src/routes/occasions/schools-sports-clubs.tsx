import { createFileRoute } from "@tanstack/react-router";
import { OccasionPage, occasionHead } from "@/components/occasion-page";
import { getOccasion } from "@/lib/occasions";

const o = getOccasion("schools-sports-clubs");

export const Route = createFileRoute("/occasions/schools-sports-clubs")({
  head: () => occasionHead(o),
  component: SchoolsPage,
});

function SchoolsPage() {
  return <OccasionPage o={o} />;
}
