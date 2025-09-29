import { NextResponse } from "next/server";
import models from "@/models/index.js"; // sequelize models load karega

const { pujas, pujaPackages, pujaOfferings, pujaFaqs, pujaImages } = models;

//
// ✅ GET /api/pujas → sab pujas fetch karo
//
export async function GET() {
  try {
    const allPujas = await pujas.findAll({
      include: [ pujaPackages, pujaOfferings, pujaFaqs, pujaImages ],
    });
    return NextResponse.json({data: allPujas,  status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const commonOfferImages = body.offerings.offerimg || [];

    const newPuja = await pujas.create(
      {
        title: body.title,
        slug: body.slug,
        ratingValue: parseFloat(body.ratingValue),
        ratingReviews: parseInt(body.ratingReviews),
        specialDay: body.specialDay,
        location: body.location,
        date: new Date(body.date),
        pujaDetails: body.pujaDetails,
        templeHistory: body.templeHistory,

        pujaPackages: body.packages.map(pkg => ({
          packImg: pkg.packImg,
          packageType: pkg.packageType,
          packagePrice: parseFloat(pkg.packagePrice),
        })),

        pujaOfferings: body.offerings.offers.map(o => ({
          title: o.title,
          Description: o.description,
          offerimg: commonOfferImages,
        })),

        pujaFaqs: body.faqs.map(f => ({
          question: f.title,
          answer: f.description,
          icon: f.icon ?? "",
        })),

        pujaImages: body.banners?.map(banner => ({
          imageUrl: banner.imgUrl,
          type: banner.type,
          position: banner.position ? parseInt(banner.position) : null,
        })) || [],
      },
      {
        include: [
          { model: pujaPackages },
          { model: pujaOfferings },
          { model: pujaFaqs },
          { model: pujaImages },
        ],
      }
    );

    return NextResponse.json({ status: 200, data: newPuja });
  } catch (error) {
    console.error("Error creating Puja:", error);

    // ✅ Sequelize validation error
    if (error.name === "SequelizeUniqueConstraintError") {
      return NextResponse.json(
        { status: "error", message: `Duplicate value: ${error.errors[0].message}` },
        { status: 400 }
      );
    }

    if (error.name === "SequelizeValidationError") {
      return NextResponse.json(
        { status: "error", message: error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    // fallback
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}