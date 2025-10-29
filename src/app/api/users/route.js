

import { NextResponse } from "next/server";
import { verifyAuth } from "../../../middleware/auth";
import models from "@/models/index.js";

const { Users } = models;

export async function GET(req) {
  const authError = await verifyAuth(req);
  if (authError) return authError; 

  const users = await Users.findAll();
  return NextResponse.json(users);
}
