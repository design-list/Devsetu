import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function toNodeRequest(req) {
  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  stream.headers = Object.fromEntries(req.headers.entries());
  stream.method = req.method;
  stream.url = req.url;

  return stream;
}

export async function POST(req) {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
    });

    const nodeReq = await toNodeRequest(req);

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    let uploaded = [];
    if (files.file) {
      if (Array.isArray(files.file)) {
        uploaded = files.file.map((f) => `/uploads/${f.newFilename}`);
      } else {
        uploaded = [`/uploads/${files.file.newFilename}`];
      }
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      storedAs: uploaded,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
