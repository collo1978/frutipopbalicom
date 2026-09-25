import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/where-to-find-us")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
});
