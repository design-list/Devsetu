

import { NextResponse } from "next/server";
import models from "@/models";

const { chadhava, chadhavaBanner, chadhavaFaqs, chadhavaPackages, Faqs, chadhavaFocus, offerings } = models;


export async function GET(req, { params }) {
    const { slugs } = params;
  try {

    const chadhavas = await chadhava.findOne({
        where: { slug: slugs }, 
        include: [chadhavaBanner, chadhavaFaqs, chadhavaPackages, chadhavaFocus ], order: [["id", "DESC"]],
    });
    if (!chadhavas) {
      return NextResponse.json({ error: "chadhavas not found" }, { status: 404 });
    }

    if (chadhavas.commonFaqs === true) {
      const faqsData = await Faqs.findAll({
        where: { type: "chadhava" },
        attributes: ["id", "question", "answer"],
        order: [["id", "ASC"]],
      });

      chadhavas.dataValues.chadhavaFaqs = faqsData;
    }

      // const offerData = await offerings.findAll({
      //   // where: { type: "puja" },
      //   // attributes: ["id", "question", "answer"],
      //   order: [["id", "ASC"]],
      // });

      // chadhavas.Offerings = offerData;

    return NextResponse.json({ data: chadhavas, status: 200 });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}