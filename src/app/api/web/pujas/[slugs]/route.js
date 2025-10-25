

import { NextResponse } from "next/server";
import models from "@/models/index.js";

const {
  pujas,
  pujaPackages,
  pujaOfferings,
  pujaFaqs,
  pujaBanners,
  templeHistory,
  pujaBenefits,
  Faqs,
  offerings,
  commonPujaPackage
} = models;

// ✅ GET /api/pujas/:slug
export async function GET(req, { params }) {
  const { slugs } = params;

  try {
    const puja = await pujas.findOne({
      where: { slug: slugs },
      include: [
        pujaPackages,
        pujaOfferings,
        pujaFaqs,
        pujaBanners,
        templeHistory,
        pujaBenefits,
      ],
      order: [["id", "DESC"]],
    });

    if (!puja) {
      return NextResponse.json({ error: "Puja not found" }, { status: 404 });
    }

    if (puja.commonFaqs === true) {
      const faqsData = await Faqs.findAll({
        where: { type: "puja" },
        attributes: ["id", "question", "answer"],
        order: [["id", "ASC"]],
      });

      puja.dataValues.pujaFaqs = faqsData;
    }

    if (puja.commonOffer === true) {
      const offerData = await offerings.findAll({
        // where: { type: "puja" },
        // attributes: ["id", "question", "answer"],
        order: [["id", "ASC"]],
      });

      puja.dataValues.pujaOfferings = offerData;
    }

    if (puja.commonPack === true) {
      const pujaPackages = await commonPujaPackage.findAll({
        // where: { type: "puja" },
        attributes: ["id", "packImg", "packagePrice", "packageType"],
        order: [["id", "ASC"]],
      });

      puja.dataValues.pujaPackages = pujaPackages;
    }

    return NextResponse.json({ data: puja, status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
