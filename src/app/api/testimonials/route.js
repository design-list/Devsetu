

import db from "@/models";

export async function POST(req) {
  try {
    const body = await req.json();
    const newTestimonial = await db.testimonials.create(body);

    return new Response(JSON.stringify(newTestimonial), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
