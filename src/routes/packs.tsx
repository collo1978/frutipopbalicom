import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/packs")({
  beforeLoad: () => {
    throw redirect({ to: "/order", search: { pack: "family" }, statusCode: 301 });
  },
});
