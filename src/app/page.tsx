import { Fragment } from "react";

import { GiftForm } from "./GiftForm";
import { InkCanvas } from "./InkCanvas";
import { Reveal } from "./Reveal";
import { ScrollProgress } from "./ScrollProgress";
import { WordRotator } from "./WordRotator";
import { Wordmark } from "./Wordmark";

const HEADLINE = "Ya es hora de que el mundo";
const HEADLINE_ACCENT = "se lea y se piense en español.";

const ROTATING = ["crónicas", "ensayos", "perfiles", "entrevistas", "adelantos"];

/** Splits a phrase into per-word spans so the hero headline can rise into place. */
function Words({
  text,
  offset = 0,
  className,
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={className ? `word ${className}` : "word"}
            style={{ "--i": index + offset } as React.CSSProperties}
          >
            <span>{word}</span>
          </span>{" "}
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
    <>
      <ScrollProgress />
      <InkCanvas />

      <div className="page">
        <header className="hero">
          <div className="shell">
            <Wordmark className="hero__mark" />

            <p className="eyebrow hero__eyebrow">Una suscripción de regalo</p>

            <h1 className="hero__title">
              <Words text={HEADLINE} />
              <Words text={HEADLINE_ACCENT} offset={headWordCount} className="hero__accent" />
            </h1>

            <p className="hero__lede">
              Alguien quiso que leyeras con nosotros. Deja tu correo y activamos tu suscripción
              a Perpetuo, la revista en español del siglo XXI.
            </p>

            <p className="hero__rotator">
              Cada semana, <WordRotator words={ROTATING} />
            </p>
          </div>

          <span className="hero__cue">Sigue leyendo</span>
        </header>

        <main>
          <section className="section">
            <div className="shell">
              <Reveal className="section__head">
                <p className="eyebrow">Por qué existimos</p>
                <h2 className="section__title">Una comunidad de lectores, no una lista de correos.</h2>
              </Reveal>

              <Reveal className="prose" delay={80}>
                <p>
                  Si estás aquí es porque queremos que seas parte de nuestra comunidad de
                  lectores. No es una prueba gratuita ni un descuento: es una suscripción que
                  alguien decidió regalarte.
                </p>
                <p>
                  Perpetuo existe por una razón simple. Eso empieza por crear un espacio para
                  nuevas voces y nuevos lectores, y es justo lo que estamos construyendo:{" "}
                  <strong>
                    la comunidad más grande de cultura y literatura de nuestro idioma
                  </strong>
                  , por y para los hispanohablantes del siglo XXI.
                </p>
              </Reveal>

              <Reveal className="pull" delay={140}>
                <p className="pull__text">
                  Queremos que el Premio Nobel regrese al español.
                </p>
                <p className="pull__by">Perpetuo</p>
              </Reveal>
            </div>
          </section>

          <section className="section section--tight" id="regalo">
            <div className="shell">
              <Reveal className="signup">
                <GiftForm initialEmail={email ?? ""} />
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="shell footer__row">
            <Wordmark className="footer__mark" />
            <p className="footer__text">
              La revista en español del siglo XXI — {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
