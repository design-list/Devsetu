

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "@/models/index.js";

const { Users } = models;

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await Users.findOne({ where: { email } });
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  // ✅ Generate JWT Token
  const token = jwt.sign(
    { id: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    status: 200,
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
