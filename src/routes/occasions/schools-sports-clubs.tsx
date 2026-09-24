import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions/schools-sports-clubs")({
  beforeLoad: () => {
    throw redirect({ to: "/occasions", hash: "schools-sports-clubs", statusCode: 301 });
  },
});
