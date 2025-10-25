

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import models from "@/models/index.js";

const { Users } = models;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, phone, roles } = body;

    const existing = await Users.findOne({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      phone,
      roles: roles || ["user"],
    });

    return NextResponse.json({status: 200, message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
