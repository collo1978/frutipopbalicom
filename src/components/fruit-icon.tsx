// Simple illustrated fruit icons for the pack tracker (one per real Fruti Pop flavour).
type Props = { name: string; className?: string };

export function FruitIcon({ name, className = "h-6 w-6" }: Props) {
  const common = { viewBox: "0 0 32 32", className, "aria-hidden": true as const };
  switch (name) {
    case "Strawberry":
      return (
        <svg {...common}>
          <path d="M16 29C8 25 4 18 5.5 13c1.2-4 5.5-5 10.5-5s9.3 1 10.5 5C28 18 24 25 16 29Z" fill="#E8344E" />
          <g fill="#FFE08A">
            <circle cx="11" cy="14" r="0.9" /><circle cx="16" cy="13" r="0.9" /><circle cx="21" cy="14" r="0.9" />
            <circle cx="13" cy="18.5" r="0.9" /><circle cx="19" cy="18.5" r="0.9" /><circle cx="16" cy="23" r="0.9" />
          </g>
          <path d="M9 9.5c2-.3 4-1.5 7-4.5 3 3 5 4.2 7 4.5-2.5 1.5-4.5 1.2-7 0-2.5 1.2-4.5 1.5-7 0Z" fill="#3FA34D" />
        </svg>
      );
    case "Mango":
      return (
        <svg {...common}>
          <path d="M8 22C5 15 9 7 17 7c6 0 10 5 9 11-1 7-7 11-12 10-3-.5-5-3-6-6Z" fill="#FFB21E" />
          <path d="M8 22c-1-3 0-6 2-8" stroke="#FF7A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M17 7c1-3 4-4 7-3-1 3-4 4-7 3Z" fill="#3FA34D" />
        </svg>
      );
    case "Pineapple":
      return (
        <svg {...common}>
          <path d="M16 12c-1-3-3-5-6-6 3 0 5 1 6 3 1-2 3-3 6-3-3 1-5 3-6 6Z" fill="#3FA34D" />
          <path d="M16 11c-.5-3 0-6 0-8 1 2 1.5 5 0 8Z" fill="#2E8540" />
          <ellipse cx="16" cy="20.5" rx="7.5" ry="9" fill="#F5B92E" />
          <path d="M10 16l12 9M10 22l8 6M13 13l10 7M22 16l-12 9M22 22l-8 6M19 13l-10 7" stroke="#C98612" strokeWidth="1" />
        </svg>
      );
    case "Passion Fruit":
      return (
        <svg {...common}>
          <circle cx="16" cy="17" r="11" fill="#6B2D7A" />
          <circle cx="16" cy="17" r="7.5" fill="#FFC928" />
          <g fill="#3A1E12"><circle cx="13.5" cy="15" r="1" /><circle cx="18" cy="14.5" r="1" /><circle cx="15" cy="19" r="1" /><circle cx="19" cy="19" r="1" /><circle cx="16.5" cy="16.8" r="1" /></g>
          <path d="M16 6c1-2 3-3 5-3" stroke="#3FA34D" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "Soursop":
      return (
        <svg {...common}>
          <path d="M16 29c-6 0-10-5-10-11S10 6 16 6s10 6 10 12-4 11-10 11Z" fill="#6DBE45" />
          <g fill="#2E8540"><path d="M11 13l1-2 1 2Z" /><path d="M19 13l1-2 1 2Z" /><path d="M15 17l1-2 1 2Z" /><path d="M10 20l1-2 1 2Z" /><path d="M20 20l1-2 1 2Z" /><path d="M15 24l1-2 1 2Z" /></g>
          <path d="M16 6c0-2 1-3 2-4" stroke="#6B4423" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "Piña Colada":
      return (
        <svg {...common}>
          <circle cx="16" cy="17" r="11" fill="#7A4B2A" />
          <circle cx="16" cy="17" r="8" fill="#FFF8EC" />
          <path d="M16 3c-1 3-1 6 0 9" stroke="#3FA34D" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M18 10c3-4 7-4 9-3-2 1-5 2-9 3Z" fill="#F5B92E" />
        </svg>
      );
    default:
      return <svg {...common}><circle cx="16" cy="16" r="11" fill="#FFB21E" /></svg>;
  }
}
