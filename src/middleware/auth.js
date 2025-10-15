import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyAuth(req) {
  try {
    // Get Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user to request (for downstream use)
    req.user = decoded;

    return null; // means pass through (no error)
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized or Invalid token" },
      { status: 401 }
    );
  }
}
