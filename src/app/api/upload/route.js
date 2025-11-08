import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "https://blr1.digitaloceanspaces.com", // ✅ upload endpoint only
  region: "blr1", // ✅ must match your space region
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

export async function POST(req) {

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}_${file.name}`;

    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileName,
      Body: fileBuffer,
      ACL: "public-read",
      ContentType: file.type || "application/octet-stream",
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.DO_SPACES_BUCKET}.blr1.cdn.digitaloceanspaces.com/${fileName}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
