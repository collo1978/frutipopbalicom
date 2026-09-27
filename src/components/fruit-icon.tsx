// Hand-drawn-style illustrated fruit icons for the pack tracker (one per real Fruti Pop flavour).
// Designed to stay readable at 20-36px: bold fills, dark outlines, simple highlights.
type Props = { name: string; className?: string };

export function FruitIcon({ name, className = "h-6 w-6" }: Props) {
  const common = { viewBox: "0 0 48 48", className, "aria-hidden": true as const };
  switch (name) {
    case "Strawberry":
      return (
        <svg {...common}>
          {/* berry body */}
          <path
            d="M24 11c9.5 0 15.5 5.5 14.2 13.5C36.9 32 31 40 24 43.5 17 40 11.1 32 9.8 24.5 8.5 16.5 14.5 11 24 11Z"
            fill="#E8354E" stroke="#9E1B33" strokeWidth="1.6" strokeLinejoin="round"
          />
          {/* highlight */}
          <ellipse cx="15.5" cy="19.5" rx="3" ry="4.5" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 15.5 19.5)" />
          {/* seeds */}
          <g fill="#FFE08A">
            <ellipse cx="16.5" cy="25" rx="1.4" ry="2.1" /><ellipse cx="24" cy="22.5" rx="1.4" ry="2.1" /><ellipse cx="31.5" cy="25" rx="1.4" ry="2.1" />
            <ellipse cx="19" cy="31.5" rx="1.4" ry="2.1" /><ellipse cx="29" cy="31.5" rx="1.4" ry="2.1" /><ellipse cx="24" cy="37" rx="1.4" ry="2.1" />
          </g>
          {/* calyx leaves */}
          <g fill="#3FA34D" stroke="#2E7D3B" strokeWidth="1.2" strokeLinejoin="round">
            <path d="M24 3.5l2.6 5.5 5.9-2.3-3 5.6 5.6 3.2-6.6.9L24 11l-4.5 5.4-6.6-.9 5.6-3.2-3-5.6 5.9 2.3z" />
          </g>
          {/* stem */}
          <path d="M24 4c.2-1.4.9-2.4 2-3" stroke="#2E7D3B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "Mango":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="fp-mango" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFC93C" /><stop offset="0.6" stopColor="#FFB21E" /><stop offset="1" stopColor="#FF8A3D" />
            </linearGradient>
          </defs>
          {/* body */}
          <path
            d="M11 28c-2-11 6-20 17-19.5 9.5.5 14.5 9 12 17.5C37.7 34.5 29 41 20.5 39 14.5 37.6 12 33 11 28Z"
            fill="url(#fp-mango)" stroke="#C96A10" strokeWidth="1.6" strokeLinejoin="round"
          />
          {/* blush */}
          <path d="M13 29c-1.4-7 1.5-13 7-16-2 5.5-3.5 10.5-2.5 16.5.7 4-3.5 3.5-4.5-.5Z" fill="#FF7A1A" opacity="0.55" />
          {/* highlight */}
          <ellipse cx="31" cy="17" rx="3.4" ry="5" fill="#FFFFFF" opacity="0.4" transform="rotate(25 31 17)" />
          {/* stem + leaf */}
          <path d="M20 8.5c-.6-2.5-1.8-4.2-3.6-5.2" stroke="#7A4B23" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M21 6.5c3-3.5 8-4.5 12-3-2.5 3.5-7.5 5-12 3Z" fill="#3FA34D" stroke="#2E7D3B" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "Pineapple":
      return (
        <svg {...common}>
          {/* crown */}
          <g fill="#3FA34D" stroke="#2E7D3B" strokeWidth="1.2" strokeLinejoin="round">
            <path d="M24 3l3 9h-6z" /><path d="M14 5.5l6.5 7.5-5 2z" /><path d="M34 5.5L27.5 13l5 2z" />
            <path d="M7 12l9 4-2.5 3.5z" /><path d="M41 12l-9 4 2.5 3.5z" />
          </g>
          {/* body */}
          <ellipse cx="24" cy="30" rx="11.5" ry="14" fill="#F6B93B" stroke="#B87A10" strokeWidth="1.6" />
          {/* crosshatch */}
          <g stroke="#C98612" strokeWidth="1.2" strokeLinecap="round">
            <path d="M15 22l17 15M14 29l13 11M16 16.5l17.5 13.5M20 17l14 11M25 17.5l9.5 7.5" fill="none" />
            <path d="M33 22L16 37M34 29L21 40M32 16.5L14.5 30M28 17L14 28M23 17.5l-9.5 7.5" fill="none" />
          </g>
          {/* highlight */}
          <ellipse cx="18.5" cy="21" rx="2.6" ry="4" fill="#FFE9A8" opacity="0.7" transform="rotate(20 18.5 21)" />
        </svg>
      );
    case "Passion Fruit":
      return (
        <svg {...common}>
          {/* whole fruit behind */}
          <circle cx="32.5" cy="18" r="9.5" fill="#5E2A7E" stroke="#3E1B56" strokeWidth="1.4" />
          <path d="M33 8.5c1.5-2.5 3.5-4 6-4.5" stroke="#3E1B56" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* cut half */}
          <circle cx="19.5" cy="29" r="14.5" fill="#5E2A7E" stroke="#3E1B56" strokeWidth="1.6" />
          <circle cx="19.5" cy="29" r="10.5" fill="#FFF3D6" />
          <circle cx="19.5" cy="29" r="8.5" fill="#FFC93C" />
          {/* pulp sacs + seeds */}
          <g fill="#3A1E12">
            <ellipse cx="19.5" cy="29" rx="1.5" ry="2.3" />
            <ellipse cx="14.5" cy="26" rx="1.3" ry="2" transform="rotate(-30 14.5 26)" />
            <ellipse cx="24.5" cy="26" rx="1.3" ry="2" transform="rotate(30 24.5 26)" />
            <ellipse cx="13.5" cy="32" rx="1.3" ry="2" transform="rotate(-60 13.5 32)" />
            <ellipse cx="25.5" cy="32" rx="1.3" ry="2" transform="rotate(60 25.5 32)" />
            <ellipse cx="19.5" cy="35" rx="1.3" ry="2" />
          </g>
          {/* highlight */}
          <ellipse cx="14" cy="21.5" rx="2.4" ry="4" fill="#FFFFFF" opacity="0.3" transform="rotate(-25 14 21.5)" />
        </svg>
      );
    case "Soursop":
      return (
        <svg {...common}>
          {/* body */}
          <path
            d="M24 8.5c8.5 0 15 5.5 15 13.5 0 9-6.5 18-15 21-8.5-3-15-12-15-21 0-8 6.5-13.5 15-13.5Z"
            fill="#71B84C" stroke="#3E7A28" strokeWidth="1.6" strokeLinejoin="round"
          />
          {/* shading */}
          <path d="M24 43c8.5-3 15-12 15-21 0-2-.4-3.8-1.1-5.4C39.5 26 33.5 36 26 40c-1 1.5-1.5 2.4-2 3Z" fill="#4E9032" opacity="0.6" />
          {/* spikes */}
          <g fill="#3E7A28">
            <path d="M24 10l2 4h-4z" /><path d="M14 13l1.8 3.6-4 .6z" /><path d="M34 13l-1.8 3.6 4 .6z" />
            <path d="M9.5 22l3.6 1.6-3 2.8z" /><path d="M38.5 22l-3.6 1.6 3 2.8z" />
            <path d="M11 31l4-.4-1.6 3.8z" /><path d="M37 31l-4-.4 1.6 3.8z" />
            <path d="M17.5 40.5l2.6-3 1.6 3.8z" /><path d="M30.5 40.5l-2.6-3-1.6 3.8z" />
          </g>
          {/* highlight */}
          <ellipse cx="17" cy="18" rx="3" ry="4.5" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 17 18)" />
          {/* stem */}
          <path d="M24 8.5c-.3-2.5.4-4.5 2-6" stroke="#6B4423" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "Piña Colada":
      return (
        <svg {...common}>
          {/* straw */}
          <g transform="rotate(18 24 14)">
            <rect x="27" y="1" width="4" height="16" rx="2" fill="#E8354E" stroke="#9E1B33" strokeWidth="1.2" />
            <rect x="27" y="3" width="4" height="3" fill="#FFFFFF" /><rect x="27" y="9" width="4" height="3" fill="#FFFFFF" />
          </g>
          {/* coconut body */}
          <circle cx="23" cy="29" r="15.5" fill="#8B5A2B" stroke="#5C3A1A" strokeWidth="1.6" />
          {/* fibres */}
          <g stroke="#6B4423" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.8">
            <path d="M13 24c3-3 6-4.5 10-4.8M33 24c-3-3-6-4.5-10-4.8M12 32c2 4 5.5 6.5 10 7M34 32c-2 4-5.5 6.5-10 7" />
          </g>
          {/* cracked opening with flesh */}
          <ellipse cx="23" cy="17.5" rx="7" ry="4.2" fill="#FFF8EC" stroke="#5C3A1A" strokeWidth="1.4" />
          {/* coconut water */}
          <ellipse cx="23" cy="17.5" rx="4.8" ry="2.4" fill="#FBF1DC" />
          {/* highlight */}
          <ellipse cx="15.5" cy="24" rx="2.6" ry="4.5" fill="#FFFFFF" opacity="0.25" transform="rotate(-25 15.5 24)" />
        </svg>
      );
    default:
      return <svg {...common}><circle cx="24" cy="24" r="15" fill="#FFB21E" /></svg>;
  }
}
