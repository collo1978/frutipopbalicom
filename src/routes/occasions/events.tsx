import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions/events")({
  beforeLoad: () => {
    throw redirect({ to: "/occasions", hash: "events", statusCode: 301 });
  },
});
