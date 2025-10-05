// src/scripts/sync.js
import db from "./models/index.js";

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB Connected");

    // await db.sequelize.sync({ force: true });
    await db.sequelize.sync({ alert: true });
    console.log("✅ Tables synced successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
})();
