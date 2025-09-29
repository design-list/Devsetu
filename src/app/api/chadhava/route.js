import { NextResponse } from "next/server";
import models from "@/models";

const { chadhava, chadhavaBanner, chadhavaFaqs, chadhavaPackages, pujaPerformed, recommendedChadawa } = models;

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

    const newChadhava = await chadhava.create(
      {
        title: body.title,
        slug: body.slug,
        ratingValue: body.ratingValue,
        ratingReviews: body.ratingReviews,
        specialDay: body.specialDay,
        location: body.location,
        date: body.date,
        pujaDetails: body.pujaDetails,
        templeHistory: body.templeHistory,

        // ✅ Use correct association keys
        chadhavaPackages: body.packages || [],
        recommendedChadawas: body.recommendedChadawa.map(item => ({
          title: item.title,
          recommendedImg: item.recommendedImg,
          status: item.status,
          location: item.location,
          currency: item.currency,
          date: item.date,
          price: item.price
        })) || [],
        chadhavaFaqs: body.faqs?.map(f => ({
          question: f.title,
          answer: f.description,
          icon: f.icon ?? "",
        })) || [],

        // ✅ Banners
        chadhavaBanners:
          body.banners?.map(banner => ({
            image_url: banner.imgUrl,
            type: banner.type,
            position: banner.position,
          })) || [],

        pujaPerformeds: body.pujaPerformedBy || [],
      },
      {
        include: [
          { model: chadhavaPackages },
          { model: recommendedChadawa },
          { model: chadhavaFaqs },
          { model: chadhavaBanner },
          { model: pujaPerformed },
        ],
      }
    );

    return NextResponse.json({ status: 200, data: newChadhava });
  } catch (error) {
    console.error("Error creating Chadhava:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
