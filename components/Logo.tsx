'use client';

interface LogoProps {
  className?: string;
  /** Pixel size of the square emblem */
  size?: number;
}

/**
 * The Grand Alton Resort crest — an elegant monogram emblem
 * built from the brand palette: royal blue, white, and gold.
 */
export default function Logo({ className = '', size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Grand Alton Resort crest"
      className={className}
    >
      {/* White medallion base */}
      <circle cx="32" cy="32" r="30" fill="#ffffff" />
      {/* Gold outer ring */}
      <circle cx="32" cy="32" r="30" stroke="#D4AF37" strokeWidth="2" />
      {/* Royal-blue inner ring */}
      <circle cx="32" cy="32" r="24.5" stroke="#0D3B66" strokeWidth="1.5" />

      {/* Crown accent */}
      <path
        d="M24 19.5l3 4 5-5.5 5 5.5 3-4 1.2 7.2H22.8L24 19.5z"
        fill="#D4AF37"
      />
      <circle cx="24" cy="18.5" r="1.4" fill="#D4AF37" />
      <circle cx="32" cy="16.5" r="1.4" fill="#D4AF37" />
      <circle cx="40" cy="18.5" r="1.4" fill="#D4AF37" />

      {/* GA monogram */}
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="22"
        fontWeight="700"
        fill="#0D3B66"
        letterSpacing="-1"
      >
        GA
      </text>

      {/* Foundation line */}
      <rect x="22" y="47.5" width="20" height="1.6" rx="0.8" fill="#D4AF37" />
    </svg>
  );
}
