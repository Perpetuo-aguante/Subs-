import { GiftForm } from "./GiftForm";

export default async function RegaloPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "560px", width: "100%" }}>
        <h1
          style={{
            color: "var(--color-pblue)",
            fontSize: "1.75rem",
            marginBottom: "1.5rem",
          }}
        >
          ¡Hola! Bienvenido a Perpetuo, la revista en español del siglo XXI.
        </h1>

        <p style={{ marginBottom: "1.25rem" }}>
          Si estás aquí es porque queremos que seas parte de nuestra comunidad de lectores.
        </p>

        <p style={{ marginBottom: "1.25rem" }}>
          Perpetuo existe por una simple razón: queremos que el premio Nobel regrese al
          español. Eso empieza con crear un espacio para nuevas voces y nuevos lectores. Y
          eso es justo lo que estamos construyendo: la comunidad más grande de cultura y
          literatura de nuestro idioma, por y para los hispanohablantes del siglo XXI.
        </p>

        <p style={{ fontWeight: 600, marginBottom: "2rem" }}>
          Ya es hora de que el mundo se lea y se piense en español.
        </p>

        <p style={{ marginBottom: "1rem" }}>
          Deja tu correo abajo para recibir tu suscripción de regalo.
        </p>

        <GiftForm initialEmail={email ?? ""} />
      </div>
    </div>
  );
}
