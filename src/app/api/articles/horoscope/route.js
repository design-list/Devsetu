import { NextResponse } from "next/server";
import models from "@/models";

const { Horoscopes } = models;

// ✅ Get All Horoscopes
export async function GET() {
  try {
    const data = await Horoscopes.findAll();
    return NextResponse.json({ status: 200, data });
  } catch (error) {
    console.error("Error fetching Horoscopes:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}

// ✅ Create New Horoscopes
export async function POST(req) {
  try {
    const body = await req.json();

    const newEntry = await Horoscopes.create({
      zodiac_sign: body.zodiac_sign,
      slug: body.slug,
      zodiac_about: body.zodiac_about,
      date_range: body.date_range,
      element: body.element,
      ruling_planet: body.ruling_planet,
      symbol: body.symbol,
      personality_snapshot: body.personality_snapshot,
      strengths: body.strengths,
      challenges: body.challenges,
      love_relationships: body.love_relationships,
      career_money: body.career_money,
      health_wellness: body.health_wellness,
      growth_tips: body.growth_tips,
      fun_fact: body.fun_fact,
      icon: body.icon,
    });

    return NextResponse.json({
      status: 200,
      message: "Horoscopes created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating Horoscopes:", error);
    return NextResponse.json({ status: 500, error: "Failed to create" });
  }
}
