import { createFileRoute } from "@tanstack/react-router";
import { OccasionPage, occasionHead } from "@/components/occasion-page";
import { getOccasion } from "@/lib/occasions";

const o = getOccasion("birthday-parties");

export const Route = createFileRoute("/occasions/birthday-parties")({
  head: () => occasionHead(o),
  component: BirthdayPage,
});

function BirthdayPage() {
  return <OccasionPage o={o} />;
}
