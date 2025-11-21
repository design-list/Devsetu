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

    // MUST await params
    const { category } = await context.params;

    const Model = categoryModelMap[category.toLowerCase()];

    if (!Model) {
      return NextResponse.json({ status: 400, error: "Invalid category" });
    }

    const article = await Model.findAll({
      order: [["updatedAt", "DESC"]] // sorted same like screenshot
    });

    if (!article || article.length === 0) {
      return NextResponse.json({ status: 404, message: "No records found" });
    }

    return NextResponse.json({
      status: 200,
      data: article
    });

  } catch (error) {
    console.error("Slug Fetch Error:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
