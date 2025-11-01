

import { NextResponse } from "next/server";
import models from "@/models";

const { chadhava, chadhavaBanner, chadhavaFaqs, chadhavaPackages, chadhavaFocus } = models;

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
        { model: chadhavaFocus }, 
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
        subTitle: body.subTitle,
        slug: body.slug,
        tags: body.tags,
        specialDay: body.specialDay,
        location: body.location,
        date: body.date,
        pujaDetails: body.pujaDetails,
        isActive: body.isActive,
        isActiveOnHome: body.isActiveOnHome,
        tithi: body.tithi,
        isRecommended: body.isRecommended,
        commonFaqs: body.commonFaqs,

        chadhavaPackages: body.packages || [],

        chadhavaFocus: body.chadhavaFocus || [],

         chadhavaFaqs: !body.commonFaqs && body.faqs?.map(f => ({
          question: f.title,
          answer: f.description,
        })) || [],

        chadhavaBanners:
        body.banners?.map(banner => ({
          image_url: banner.imgUrl,
          type: banner.type,
          position: banner.position,
        })) || [],
        
      },
      {
        include: [
          { model: chadhavaPackages },
          { model: chadhavaFaqs },
          { model: chadhavaBanner },
          { model: chadhavaFocus },
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
