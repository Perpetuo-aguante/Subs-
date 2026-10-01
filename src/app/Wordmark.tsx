import { Punto } from "./Punto";

/**
 * The primary logotype from the 2026 brand book: PERPETUO set in heavy caps,
 * with the blue punto perched on the T. Set as live text in the display face
 * so it inherits `currentColor` and scales with `font-size`.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={className ? `wordmark ${className}` : "wordmark"}
      role="img"
      aria-label="Perpetuo"
    >
      <span aria-hidden="true">
        PERPE
        <span className="wordmark__t">
          T
          <Punto className="wordmark__punto" />
        </span>
        UO
      </span>
    </span>
  );
}
