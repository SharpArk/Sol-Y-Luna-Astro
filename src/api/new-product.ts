import { API_URL } from "astro:env/server";

export async function post({ request }: { request: Request }) {
  const formData = await request.formData();

  const response = await fetch(`${API_URL}/products/new_product/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
