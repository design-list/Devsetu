

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 


const { UserDetails } = models;


// 🟩 POST → Add new user details

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Add new user details", body);

    // 🟩 Extract user details safely
    const u = body.userDetails || {};

    const newUser = await UserDetails.create({
      whatsapp: u.whatsapp,
      name: u.name,
      gotra: u.gotra,
      address: u.address,
      postalCode: u.postalCode,
      city: u.city,
      state: u.state,
      members: u.members || [],
      cartId: body.cartId || null, // if needed
    });

    return NextResponse.json({
      status: 200,
      message: "User details added successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user details:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to create user details", error: error.message },
      { status: 500 }
    );
  }
}


// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("Add new user details", body)

//     const newUser = await UserDetails.create({
//       whatsapp: body.whatsapp,
//       name: body.name,
//       gotra: body.gotra,
//       address: body.address,
//       postalCode: body.postalCode,
//       city: body.city,
//       state: body.state,
//       members: body.members || [],
//     });

//     return NextResponse.json({
//       status: 200,
//       message: "User details added successfully",
//       data: newUser,
//     });
//   } catch (error) {
//     console.error("Error creating user details:", error);
//     return NextResponse.json(
//       { status: "error", message: "Failed to create user details", error },
//       { status: 500 }
//     );
//   }
// }

// 🟩 GET → Fetch all user details
export async function GET() {
  try {
    const users = await UserDetails.findAll({
      order: [["id", "DESC"]],
    });

    return NextResponse.json({
      status: 200,
      message: "user details",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch user details", error },
      { status: 500 }
    );
  }
}
