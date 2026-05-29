export async function POST() {
  return Response.json(
    { error: "API Route deprecated. Use client-side logic instead." },
    { status: 410 }
  );
}
