export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="card">
      <h1>Item {id}</h1>
      <p>Detalle del item capturado.</p>
    </div>
  );
}
