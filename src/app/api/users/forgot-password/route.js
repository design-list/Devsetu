

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import models from "@/models/index.js";

const { Users } = models;

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await Users.findOne({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    console.log(`Reset token for ${email}: ${resetToken}`);

    return NextResponse.json({
      message: "Password reset link generated",
      resetToken,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
