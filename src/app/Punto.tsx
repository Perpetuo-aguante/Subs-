/**
 * "El punto", the brand book's mascot: an ink dot with eyes and stick legs.
 * The body inherits `currentColor`; the eyes stay paper-white.
 */
export function Punto({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 118" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 84 39 108h-7" />
        <path d="M60 84 61 108h7" />
      </g>
      <path
        fill="currentColor"
        d="M50 7c22-1 41 16 41 40 1 23-17 41-40 41C27 89 9 72 9 49 8 25 27 8 50 7Z"
      />
      <ellipse cx="47" cy="33" rx="9" ry="8.5" fill="#fff" />
      <ellipse cx="67" cy="32" rx="8" ry="8" fill="#fff" />
      <circle cx="51" cy="34" r="4.2" fill="#0d1114" />
      <circle cx="70.5" cy="33" r="3.8" fill="#0d1114" />
    </svg>
  );
}
