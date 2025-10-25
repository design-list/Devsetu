

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { pujas, pujaPackages, pujaOfferings, pujaFaqs, pujaBanners, templeHistory, pujaBenefits } = models;


export async function GET() {
  try {
    const allPujas = await pujas.findAll({
      include: [ pujaPackages, pujaOfferings, pujaFaqs, pujaBanners, templeHistory, pujaBenefits ],
    });
    return NextResponse.json({data: allPujas,  status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const newPuja = await pujas.create(
//       {
//         title: body.title,
//         subTitle: body.subTitle,
//         slug: body.slug,
//         ratingValue: parseFloat(body.ratingValue),
//         ratingReviews: parseInt(body.ratingReviews),
//         specialDay: body.specialDay,
//         location: body.location,
//         date: new Date(body.date),
//         pujaDetails: body.pujaDetails,
//         isActive: body.isActive,
//         isActiveOnHome: body.isActiveOnHome,
        
//         commonOffer: body.commonOffer,
//         commonPack: body.commonPack,
//         commonFaqs: body.commonFaqs,

//         pujaPackages: body.packages.map(pkg => ({
//           packImg: pkg.packImg,
//           packageType: pkg.packageType,
//           packagePrice: parseFloat(pkg.packagePrice),
//         })),

//         pujaOfferings: body.offerings.map(o => ({
//           title: o.title,
//           description: o.description,
//           offerimg: o.offerimg,
//           price: o.price,
//         })),

//         templeHistories: body.temple ? [{
//           templeImg: body.temple.templeImg,
//           templeName: body.temple.templeName,
//           templeHistory: body.temple.templeHistory
//         }] : [],

//         pujaFaqs: body.faqs.map(f => ({
//           question: f.title,
//           answer: f.description,
//         })),

//         pujaBanners: body.banners?.map(banner => ({
//           imageUrl: banner.imgUrl,
//           type: banner.type,
//           position: banner.position ? parseInt(banner.position) : null,
//         })) || [],
//       },
//       {
//         include: [
//           { model: pujaPackages },
//           { model: pujaOfferings },
//           { model: pujaFaqs },
//           { model: pujaBanners },
//           { model: templeHistory }
//         ],
//       }
//     );

//     return NextResponse.json({ status: 200, data: newPuja });
//   } catch (error) {
//     console.error("Error creating Puja:", error);

//     // ✅ Sequelize validation error
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return NextResponse.json(
//         { status: "error", message: `Duplicate value: ${error.errors[0].message}` },
//         { status: 400 }
//       );
//     }

//     if (error.name === "SequelizeValidationError") {
//       return NextResponse.json(
//         { status: "error", message: error.errors.map(e => e.message).join(", ") },
//         { status: 400 }
//       );
//     }

//     // fallback
//     return NextResponse.json(
//       { status: "error", message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  try {
    const body = await req.json();

    const newPuja = await pujas.create(
      {
        title: body.title,
        subTitle: body.subTitle,
        slug: body.slug,
        ratingValue: parseFloat(body.ratingValue),
        ratingReviews: parseInt(body.ratingReviews),
        specialDay: body.specialDay,
        location: body.location,
        date: new Date(body.date),
        pujaDetails: body.pujaDetails,
        isActive: body.isActive,
        isActiveOnHome: body.isActiveOnHome,

        // Flags
        commonOffer: body.commonOffer,
        commonPack: body.commonPack,
        commonFaqs: body.commonFaqs,

        // ✅ Packages only if commonPack is false
        pujaPackages: !body.commonPack
          ? body.packages?.map(pkg => ({
              packImg: pkg.packImg,
              packageType: pkg.packageType,
              packagePrice: parseFloat(pkg.packagePrice),
            }))
          : [],

        // ✅ Offerings only if commonOffer is false
        pujaOfferings: !body.commonOffer
          ? body.offerings?.map(o => ({
              title: o.title,
              description: o.description,
              offerimg: o.offerimg,
              price: o.price,
            }))
          : [],

        // ✅ FAQs only if commonFaqs is false
        pujaFaqs: !body.commonFaqs
          ? body.faqs?.map(f => ({
              question: f.title,
              answer: f.description,
            }))
          : [],

        // ✅ pujaBenefits  
        pujaBenefits: body.pujaBenefits?.map(b => ({
              title: b.title,
              description: b.description,
            }))
          || [],

        // Temple history (no condition here)
        templeHistories: body.temple
          ? [
              {
                templeImg: body.temple.templeImg,
                templeName: body.temple.templeName,
                templeHistory: body.temple.templeHistory,
              },
            ]
          : [],

        // ✅ Banners always allowed
        pujaBanners:
          body.banners?.map(banner => ({
            imageUrl: banner.imgUrl,
            type: banner.type,
            position: banner.position
              ? parseInt(banner.position)
              : null,
          })) || [],
      },
      {
        include: [
          { model: pujaPackages },
          { model: pujaOfferings },
          { model: pujaFaqs },
          { model: pujaBanners },
          { model: templeHistory },
          { model: pujaBenefits },
        ],
      }
    );

    return NextResponse.json({ status: 200, data: newPuja });
  } catch (error) {
    console.error("Error creating Puja:", error);

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

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}