import { NextResponse } from "next/server";
import models from "@/models";

const categoryModelMap = {
  aarti: models.Aartis,
  chalisa: models.Chalisas,
  mantra: models.Mantras,
  horoscope: models.Horoscopes,
};

export async function GET(req, context) {
  try {

    // ⬅ MUST await params
    const { category, slug } = await context.params;

    const Model = categoryModelMap[category?.toLowerCase()];
    
    if (!Model) {
      return NextResponse.json({ status: 400, error: "Invalid category" });
    }

    // Fetch article by slug
    const article = await Model.findOne({ where: { slug } });

    if (!article) {
      return NextResponse.json({ status: 404, message: "Article not found" });
    }

    return NextResponse.json({
      status: 200,
      category,
      data: article,
    });

  } catch (error) {
    console.error("Slug Fetch Error:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
