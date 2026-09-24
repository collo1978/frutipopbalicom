import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/where-to-buy")({ beforeLoad: () => { throw redirect({ to: "/where-to-find-us", statusCode: 301 }); } });
