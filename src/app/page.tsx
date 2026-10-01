import { Fragment } from "react";

import { GiftForm } from "./GiftForm";
import { Punto } from "./Punto";
import { WordRotator } from "./WordRotator";
import { Wordmark } from "./Wordmark";

const HEADLINE = "Ya es hora de que el mundo";
const HEADLINE_ACCENT = "se lea y se piense en español";

const ROTATING = ["crónicas", "ensayos", "perfiles", "entrevistas", "adelantos"];

/** Splits a phrase into per-word spans so the hero headline can rise into place. */
function Words({
  text,
  offset = 0,
  className,
  last,
}: {
  text: string;
  offset?: number;
  className?: string;
  /** Rendered inside the final word's span, so it never wraps onto its own line. */
  last?: React.ReactNode;
}) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={className ? `word ${className}` : "word"}
            style={{ "--i": index + offset } as React.CSSProperties}
          >
            <span>
              {word}
              {index === words.length - 1 && last}
            </span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

export default async function GiftLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  const headWordCount = HEADLINE.split(" ").length;

  return (
    <main className="hero">
      <div className="shell">
        <Wordmark className="hero__mark" />

        <p className="eyebrow hero__eyebrow">Una suscripción de regalo</p>

        <h1 className="hero__title">
          <Words text={HEADLINE} />{" "}
          <Words
            text={HEADLINE_ACCENT}
            offset={headWordCount}
            className="hero__accent"
            last={
              <>
                <span className="sr-only">.</span>
                <Punto className="hero__punto" />
              </>
            }
          />
        </h1>

        <p className="hero__lede">
          Alguien quiso que leyeras con nosotros. Deja tu correo y activamos tu suscripción a
          Perpetuo, la revista en español del siglo XXI.
        </p>

        <p className="hero__rotator">
          Cada semana, <WordRotator words={ROTATING} />
        </p>

        <div className="hero__form">
          <GiftForm initialEmail={email ?? ""} />
        </div>
      </div>
    </main>
  );
}
