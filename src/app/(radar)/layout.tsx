export default function RadarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header style={{ padding: "1rem 2rem", borderBottom: "1px solid var(--color-pborder)" }}>
        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <a href="/">Radar</a>
          <a href="/capturar">Capturar</a>
          <a href="/fuentes">Fuentes</a>
          <a href="/keywords">Keywords</a>
        </nav>
      </header>
      <main style={{ padding: "2rem" }}>{children}</main>
      <footer style={{ padding: "1rem 2rem", borderTop: "1px solid var(--color-pborder)" }}>
        <small>Radar Perpetuo — uso interno</small>
      </footer>
    </>
  );
}
