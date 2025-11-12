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

    const createdModels = [];
    const alteredModels = [];

    for (const modelName of Object.keys(db)) {
      const model = db[modelName];
      if (model?.getTableName) {
        const tableName =
          typeof model.getTableName === "string"
            ? model.getTableName
            : model.getTableName();

        const tableExists = await db.sequelize
          .getQueryInterface()
          .showAllTables()
          .then((tables) =>
            tables.includes(
              typeof tableName === "object" ? tableName.tableName : tableName
            )
          );

        if (!tableExists) {
          await model.sync({ force: true }); // create new table
          createdModels.push(modelName);
          console.log(`🆕 Created new table for: ${modelName}`);
        } else {
          await model.sync({ alter: true }); // update existing table
          alteredModels.push(modelName);
          console.log(`✅ Altered table for: ${modelName}`);
        }
      }
    }

    return NextResponse.json({
      message: "✅ Database synced successfully!",
      createdModels,
      alteredModels,
    });
  } catch (error) {
    console.error("❌ Sync failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
