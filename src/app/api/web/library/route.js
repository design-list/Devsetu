

import { NextResponse } from "next/server";
import models from "@/models/index.js"; 

const { Aartis, Chalisas, Mantras, Horoscopes } = models;

export async function GET() {
  try {
    
    const allAartis = await Aartis.findAll();
    const allChalisas = await Chalisas.findAll();
    const allMantras = await Mantras.findAll();
    const allHoroscopes = await Horoscopes.findAll();

    return NextResponse.json({
      status: 200,
      message: "All Articals data fetched successfully",
      data: {allAarti : [...allAartis] ,   
          allChalisa : [...allChalisas],
          allMantra: [...allMantras],
          allHoroscope :[...allHoroscopes],
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
