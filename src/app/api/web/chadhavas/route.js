

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { chadhava, chadhavaBanner } = models;

export async function GET() {
  try {

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


    const formattedChadhavaData = chadhavaData.map(c => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      banners: c.chadhavaBanners || [],
      type: "chadhava"
    }));

    return NextResponse.json({
      status: 200,
      message: "Chadhava page data fetched successfully",
      data: { heroBanner: [...formattedChadhavaData], 
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
