// /api/users/reset-password




import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "@/models/index.js";

const { Users } = models;

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findByPk(decoded.id);

    if (!user)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 500 });
  }
}
