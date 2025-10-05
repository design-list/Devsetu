import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { pujas, pujaImages, chadhava, chadhavaBanner } = models;

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
        limit: 3,
        order: [["date", "DESC"]],
    });

    // Chadhavas fetch
    const chadhavaData = await chadhava.findAll({
      where: { isActive: true, isActiveOnHome: true },
      attributes: ["id", "title", "slug"],
      include: [
        {
          model: chadhavaBanner,
          where: { position: 1 },
          attributes: ["id", "image_url", "position", "type"],
        },
      ],
    });

    const chadhavaCard = await chadhava.findAll({
      where: { isActive: true, isActiveOnHome: false },
      attributes: ["id", "title", "slug", "sub_title", "chadhava_details", "date"],
      include: [
        {
          model: chadhavaBanner,
          where: { position: 1 },
          attributes: ["id", "image_url", "position", "type"],
        },
      ],
        limit: 3,
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

    const formattedChadhavaData = chadhavaData.map(c => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      banners: c.chadhavaBanners || [],
      type: "chadhava"
    }));

    return NextResponse.json({
      status: 200,
      message: "Home page data fetched successfully",
      data: { heroBanner: [...formattedPujaData, ...formattedChadhavaData], 
          pujaCard: pujaCard, 
          chadhavaCard: chadhavaCard
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
