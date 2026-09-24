import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions/villas-poolside")({
  beforeLoad: () => {
    throw redirect({ to: "/occasions", hash: "villas-poolside", statusCode: 301 });
  },
});
