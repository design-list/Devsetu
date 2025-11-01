

import { NextResponse } from "next/server";
import models from "@/models";

const { chadhava, chadhavaBanner, chadhavaFaqs, chadhavaPackages, chadhavaFocus } = models;


export async function GET(req, { params }) {
  try {
    const chadhavas = await chadhava.findByPk(params.id, {
      include: [chadhavaBanner, chadhavaFaqs, chadhavaPackages, chadhavaFocus ], order: [["id", "DESC"]],
    });
    if (!chadhavas) {
      return NextResponse.json({ error: "chadhavas not found" }, { status: 404 });
    }
    return NextResponse.json({ data: chadhavas, status: 200 });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//
// ✅ DELETE /api/chadhava/:id
//
export async function DELETE(req, { params }) {
  try {
    const chadhavas = await chadhava.findByPk(params.id);
    if (!chadhavas) {
      return NextResponse.json({ error: "chadhavas not found" }, { status: 404 });
    }

    await chadhavas.destroy();
    return NextResponse.json({ status: 200, message: "chadhavas deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    const updatedChadhava = await chadhava.findByPk(params.id);

    if (!updatedChadhava) {
      return NextResponse.json({ error: "Chadhava not found" }, { status: 404 });
    }

    // ✅ Update main table
    await updatedChadhava.update({
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
    });

    // ✅ Update banners
    if (body.banners) {
      await chadhavaBanner.destroy({ where: { chadhavaId: updatedChadhava.id } });

      await chadhavaBanner.bulkCreate(
        body.banners.map((banner) => ({
          image_url: banner.imgUrl,
          type: banner.type,
          position: banner.position,
          chadhavaId: updatedChadhava.id, // ✅ FK
        }))
      );
    }

    // ✅ Update packages
    if (body.packages) {
      await chadhavaPackages.destroy({ where: { chadhavaId: updatedChadhava.id } });
      await chadhavaPackages.bulkCreate(
        body.packages.map((p) => ({
          ...p,
          chadhavaId: updatedChadhava.id,
        }))
      );
    }

    // ✅ Update Focuse
    if (body.chadhavaFocus){
      await chadhavaFocus.destroy({ where: { chadhavaId: updatedChadhava.id } });
      await chadhavaFocus.bulkCreate(
        body.chadhavaFocus.map((f) => ({
          ...f,
          chadhavaId: updatedChadhava.id,
        }))
      );
    }

     // ✅ Update FAQs
    if (!body.commonFaqs && body.faqs) {
      await chadhavaFaqs.destroy({ where: { chadhavaId: updatedChadhava.id } });
      await chadhavaFaqs.bulkCreate(
        body.faqs.map((f) => ({
          icon: f.icon,
          question: f.title,
          answer: f.description,
          chadhavaId: updatedChadhava.id,
        }))
      );
    }

    // ✅ Update recommended chadhawas

    // if (body.isRecommended && body.recommendedChadawa) {
    //   await recommendedChadawa.destroy({ where: { chadhavaId: updatedChadhava.id } });
    //   await recommendedChadawa.bulkCreate(
    //     body.recommendedChadawa.map((r) => ({
    //       ...r,
    //       chadhavaId: updatedChadhava.id,
    //     }))
    //   );
    // }

    // // ✅ Update templeHistory
    // if (body.temple) {
    //   await templeHistory.destroy({ where: { chadhavaId: updatedChadhava.id } });
    //   await templeHistory.create({
    //     ...body.temple,
    //     chadhavaId: updatedChadhava.id,
    //   });
    // }

   

    // ✅ Update Puja Performed By (assuming only one)
    // if (body.isActivePandit && body.pujaPerformedBy) {
    //   await pujaPerformed.destroy({ where: { chadhavaId: updatedChadhava.id } });
    //   await pujaPerformed.create({
    //     ...body.pujaPerformedBy,
    //     chadhavaId: updatedChadhava.id,
    //   });
    // }

    // ✅ Fetch back with associations
    const finalData = await chadhava.findByPk(updatedChadhava.id, {
      include: [chadhavaBanner, chadhavaPackages, chadhavaFaqs, chadhavaFocus ],
    });

    return NextResponse.json({
      data: finalData,
      status: 200,
      message: "Chadhava updated successfully",
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
