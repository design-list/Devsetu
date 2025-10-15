import { NextResponse } from "next/server";
import { verifyAuth } from "@/middleware/auth";
import db from "@/models"; // your sequelize models

export async function GET(req) {
  const authError = await verifyAuth(req);
  if (authError) return authError; 

  const users = await db.Users.findAll();
  return NextResponse.json(users);
}
