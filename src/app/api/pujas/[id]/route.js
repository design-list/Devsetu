

import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { pujas, pujaPackages, pujaOfferings, pujaFaqs, pujaBanners, templeHistory, pujaBenefits } = models;

// ✅ GET /api/pujas/:id

export async function GET(req, { params }) {

  const { id } = params;

  try {
    // const isId = !isNaN(Number(id));

    const puja = await pujas.findOne({
      where: { id: id },
      include: [pujaPackages, pujaOfferings, pujaFaqs, pujaBanners, templeHistory, pujaBenefits],
      order: [["id", "DESC"]],
    });

    if (!puja) {
      return NextResponse.json({ error: "Puja not found" }, { status: 404 });
    }

    return NextResponse.json({ data: puja, status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

  export async function PUT(req, { params }) {
    try {
      const body = await req.json();
      const updatedPujas = await pujas.findByPk(params.id);

      if (!updatedPujas) {
        return NextResponse.json({ error: "Puja not found" }, { status: 404 });
      }

      // ✅ Update main puja table
      await updatedPujas.update({
        title: body.title,
        subTitle: body.subTitle,
        slug: body.slug,
        ratingValue: parseFloat(body.ratingValue),
        ratingReviews: parseInt(body.ratingReviews),
        specialDay: body.specialDay,
        tags: body.tags,
        location: body.location,
        date: new Date(body.date),
        pujaDetails: body.pujaDetails,
        isActive: body.isActive,
        isActiveOnHome: body.isActiveOnHome,

        // Flags
        commonOffer: body.commonOffer,
        commonPack: body.commonPack,
        commonFaqs: body.commonFaqs,
      });

      // ✅ Update temple (always if provided)
      if (body.temple) {
        await templeHistory.destroy({ where: { pujaId: updatedPujas.id } });
        await templeHistory.create({
          ...body.temple,
          pujaId: updatedPujas.id,
        });
      }

      // ✅ Update banners (always)
      if (Array.isArray(body.banners)) {
        await pujaBanners.destroy({ where: { pujaId: updatedPujas.id } });
        await pujaBanners.bulkCreate(
          body.banners.map((banner) => ({
            imageUrl: banner.imgUrl,
            mobileImageUrl: banner.mobileImageUrl,
            type: banner.type,
            position: banner.position ? parseInt(banner.position) : null,
            pujaId: updatedPujas.id,
          }))
        );
      }

      // ✅ Update Packages only if commonPack is false
      if (!body.commonPack && Array.isArray(body.packages)) {
        await pujaPackages.destroy({ where: { pujaId: updatedPujas.id } });
        await pujaPackages.bulkCreate(
          body.packages.map((pkg) => ({
            packImg: pkg.packImg,
            packageType: pkg.packageType,
            packageDescription: pkg.packageDescription,
            noOfPeople: parseFloat(pkg.noOfPeople),
            packagePrice: parseFloat(pkg.packagePrice),
            pujaId: updatedPujas.id,
          }))
        );
      }

      // ✅ Update Offerings only if commonOffer is false
      if (!body.commonOffer && Array.isArray(body.offerings)) {
        await pujaOfferings.destroy({ where: { pujaId: updatedPujas.id } });
        await pujaOfferings.bulkCreate(
          body.offerings.map((r) => ({
            offerimg: r.offerimg,
            title: r.title,
            tags: r.tags,
            strikePrice: r.strikePrice ? parseInt(r.strikePrice) : null,
            price: r.price ? parseInt(r.price) : 0,
            position: r.position,
            description: r.description,
            pujaId: updatedPujas.id,
          }))
        );
      }

      // ✅ Update FAQs only if commonFaqs is false
      if (!body.commonFaqs && Array.isArray(body.faqs)) {
        await pujaFaqs.destroy({ where: { pujaId: updatedPujas.id } });
        await pujaFaqs.bulkCreate(
          body.faqs.map((f) => ({
            question: f.title,
            answer: f.description,
            pujaId: updatedPujas.id,
          }))
        );
      }

      // ✅ pujaBenefits  

      if(body.pujaBenefits && Array.isArray(body.pujaBenefits)){
       await pujaBenefits.destroy({ where: { pujaId: updatedPujas.id } });
        await pujaBenefits.bulkCreate(
          body.pujaBenefits.map((b) => ({
            title: b.title,
            description: b.description,
            pujaId: updatedPujas.id,
          }))
        );
      }
     
      // ✅ Fetch updated data with associations
      const finalData = await pujas.findByPk(updatedPujas.id, {
        include: [pujaPackages, pujaOfferings, pujaFaqs, pujaBanners, templeHistory, pujaBenefits],
      });

      return NextResponse.json({
        data: finalData,
        status: 200,
        message: "Puja updated successfully",
      });
    } catch (error) {
      console.error("PUT Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }




//
// ✅ DELETE /api/pujas/:id
//
export async function DELETE(req, { params }) {
  try {
    const puja = await pujas.findByPk(params.id);
    if (!puja) {
      return NextResponse.json({ error: "Puja not found" }, { status: 404 });
    }

    await puja.destroy();
    return NextResponse.json({ status: 200, message: "Puja deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
