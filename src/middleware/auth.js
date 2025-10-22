import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyAuth(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return null;
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized or Invalid token" },
      { status: 401 }
    );
  }
}
