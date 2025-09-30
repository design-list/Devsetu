import { NextResponse } from "next/server";
import models from "@/models";

const { Aartis, Chalisas, Festivals, Horoscopes, Wishes } = models;

//
// GET: fetch all chadhavas with relations
//
export async function GET() {
  try {
    const allChadhavas = await chadhava.findAll({
      include: [
        { model: chadhavaBanner },
        { model: chadhavaFaqs },
        { model: chadhavaPackages },
        { model: pujaPerformed },
        { model: recommendedChadawa },
      ],
    });

    return NextResponse.json({ data: allChadhavas, status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

//
// POST: create new chadhava with associations
//

export async function POST(req) {
  try {
    const body = await req.json();
    const type = body.type;

    // mapping between type and model
    const modelMap = {
      aartis: Aartis,
      chalisas: Chalisas,
      festivals: Festivals,
      horoscopes: Horoscopes,
      wishes: Wishes,
    };

    if (!type || !modelMap[type]) {
      return NextResponse.json(
        { status: "error", message: "Invalid or missing article type." },
        { status: 400 }
      );
    }

    const Model = modelMap[type];

    // prepare payload for DB
    const articlesData =
      body.articles?.map((f) => ({
        title: f.title,
        description: f.description,
        icon: f.icon ?? "",
      })) || [];

    // bulk insert into the right table
    const newArticles = await Model.bulkCreate(articlesData);

    return NextResponse.json({ status: 200, data: newArticles });
  } catch (error) {
    console.error("Error creating articles:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
