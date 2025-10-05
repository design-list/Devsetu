import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { pujas, pujaImages } = models;

export async function GET() {
  try {
    // Pujas fetch
    const pujaData = await pujas.findAll({
      where: { isActive: true, isActiveOnHome: true },
      attributes: ["id", "title", "slug"],
      include: [
        {
          model: pujaImages,
          where: { position: 1 },
          attributes: ["id", "image_url", "position", "type"],
        },
      ],
    });

    const pujaCard = await pujas.findAll({
      where: { isActive: true, isActiveOnHome: false },
      attributes: ["id", "title", "slug", "sub_title", "location", "date"],
      include: [
        {
          model: pujaImages,
          where: { position: 1 },
          attributes: ["id", "image_url", "position", "type"],
        },
      ],
        order: [["date", "DESC"]],
    });


    // Map data and rename pujaImages / chadhavaBanners to banners
    const formattedPujaData = pujaData.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      banners: p.pujaImages || [],
      type: "puja"
    }));


    return NextResponse.json({
      status: 200,
      message: "Puja page data fetched successfully",
      data: { heroBanner: [...formattedPujaData], 
          pujaCard: pujaCard, 
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
