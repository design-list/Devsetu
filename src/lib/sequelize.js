// src/lib/sequelize.js

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ Database connected..");
} catch (err) {
  console.log("❌ Error:", err);
}

export default sequelize;






// // src/lib/sequelize.js
// import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize("dev-setu-db", "root", "", {
//   host: "localhost",
//   dialect: "mssql",
//   pool: { max: 5, min: 0, idle: 10000 },
// });

// try {
//   await sequelize.authenticate();
//   console.log("✅ Database connected..");
// } catch (err) {
//   console.log("❌ Error:", err);
// }

// export default sequelize;
