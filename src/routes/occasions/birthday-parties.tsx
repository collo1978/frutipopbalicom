import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions/birthday-parties")({
  beforeLoad: () => {
    throw redirect({ to: "/occasions", hash: "birthday-parties", statusCode: 301 });
  },
});
