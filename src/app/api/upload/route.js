import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: process.env.DO_SPACES_REGION,
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

    await s3
      .putObject({
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ACL: "public-read", // ताकि URL से access हो सके
        ContentType: file.type,
      })
      .promise();

    const fileUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}












// import { S3 } from "aws-sdk";
// import { NextResponse } from "next/server";
// import formidable from "formidable";
// import fs from "fs";

// // Next.js में file upload के लिए body parsing disable करनी होती है
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Helper function: FormData parse करने के लिए
// const parseForm = (req) =>
//   new Promise((resolve, reject) => {
//     const form = formidable({ multiples: false });
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });

// export async function POST(req) {
//   try {
//     const s3 = new S3({
//       endpoint: process.env.DO_SPACE_ENDPOINT,
//       accessKeyId: process.env.DO_SPACE_KEY,
//       secretAccessKey: process.env.DO_SPACE_SECRET,
//       region: process.env.DO_SPACE_REGION,
//     });

//     const { files } = await parseForm(req);

//     const file = files.file; // "file" key FormData से आना चाहिए
//     const fileStream = fs.createReadStream(file.filepath);

//     const uploadParams = {
//       Bucket: process.env.DO_SPACE_NAME,
//       Key: `uploads/${Date.now()}-${file.originalFilename}`,
//       Body: fileStream,
//       ACL: "public-read", // file को publicly accessible बनाता है
//       ContentType: file.mimetype,
//     };

//     const result = await s3.upload(uploadParams).promise();

//     // CDN URL generate करें (optional)
//     const cdnUrl = `${process.env.CDN_BASE_URL}/uploads/${file.originalFilename}`;

//     return NextResponse.json({
//       message: "✅ File uploaded successfully!",
//       location: result.Location,
//       cdnUrl,
//     });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


