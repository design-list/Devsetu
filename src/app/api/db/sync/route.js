// src/app/api/db/sync/route.js
import db from "@/models/index.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.sequelize.authenticate();
    console.log("✅ DB Connected");

    const alteredModels = [];

    for (const modelName of Object.keys(db)) {
      const model = db[modelName];
      if (model?.sync) {
        await model.sync({ alter: true });
        alteredModels.push(modelName);
        console.log(`✅ Synced model: ${modelName}`);
      }
    }

    return NextResponse.json({
      message: "✅ Database synced successfully!",
      alteredModels,
    });
  } catch (error) {
    console.error("❌ Sync failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
