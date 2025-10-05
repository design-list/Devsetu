import { NextResponse } from "next/server";
import models from "@/models/index.js";

const { pujas, pujaPackages, pujaOfferings, pujaFaqs, pujaImages, templeHistory } = models;

// ✅ GET /api/pujas/:id

export async function GET(req, { params }) {

  const { id } = params;

  try {
    const isId = !isNaN(Number(id));

    const puja = await pujas.findOne({
      where: isId ? { id: id } : { slug: id }, 
      include: [pujaPackages, pujaOfferings, pujaFaqs, pujaImages, templeHistory],
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


// ✅ PUT /api/pujas/:id
export async function PUT(req, { params }) {


  try {
    const body = await req.json();

    // const pujaOfferingImages = body.offerings.offerimg || [];

    const updatedPujas = await pujas.findByPk(params.id);

    if (!updatedPujas) {
      return NextResponse.json({ error: "Puja not found" }, { status: 404 });
    }

    // ✅ Update main table
    await updatedPujas.update({
      title: body.title,
      subTitle: body.subTitle,
      slug: body.slug,
      ratingValue: body.ratingValue,
      ratingReviews: body.ratingReviews,
      specialDay: body.specialDay,
      location: body.location,
      date: body.date,
      pujaDetails: body.pujaDetails,
      isActive: body.isActive,
      isActiveOnHome: body.isActiveOnHome,
    });

    if (body.temple) {
      await templeHistory.destroy({ where: { pujaId: updatedPujas.id  } });
      await templeHistory.create({
        ...body.temple,
        pujaId: updatedPujas.id,
      });
    }

      if (body.banners && Array.isArray(body.banners)) {
      await pujaImages.destroy({ where: { pujaId: updatedPujas.id } });

      await pujaImages.bulkCreate(
        body.banners.map((banner) => ({
          imageUrl: banner.imgUrl,
          type: banner.type,
          position: banner.position ? parseInt(banner.position) : null,
          pujaId: updatedPujas.id,
        }))
      );
    }

    // 🧩 4️⃣ Update Packages
    if (body.packages) {
      await pujaPackages.destroy({ where: { pujaId: updatedPujas.id } });
      await pujaPackages.bulkCreate(
        body.packages.map((pkg) => ({
          packImg: pkg.packImg,
          packageType: pkg.packageType,
          packagePrice: parseFloat(pkg.packagePrice),
          pujaId: updatedPujas.id,
        }))
      );
    }


    // ✅ Update offerings (offers + offerimg)
    if (body.offerings && (body.offerings.offers || body.offerings.offerimg)) {
      await pujaOfferings.destroy({ where: { pujaId: updatedPujas.id } });

      // combine offers array with offerimg array
      const offersArray = body.offerings.offers || [];

      await pujaOfferings.bulkCreate(
        offersArray.map((r) => ({
          offerimg: body.offerings.offerimg || [], // array will be stored as JSON
          title: r.title,
          description: r.description,
          pujaId: updatedPujas.id,
        }))
      );
    }


    // ✅ Update FAQs
    if (body.faqs) {
      await pujaFaqs.destroy({ where: { pujaId: updatedPujas.id } });
      await pujaFaqs.bulkCreate(
        body.faqs.map((f) => ({
          icon: f.icon,
          question: f.title,
          answer: f.description,
          pujaId: updatedPujas.id,
        }))
      );
    }

    // ✅ Fetch back with associations
    const finalData = await pujas.findByPk(updatedPujas.id, {
      include: [pujaPackages, pujaOfferings, pujaFaqs, pujaImages, templeHistory],
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
