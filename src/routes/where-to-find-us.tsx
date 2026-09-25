import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/where-to-find-us")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "where-to-find-us", statusCode: 301 });
  },
});
