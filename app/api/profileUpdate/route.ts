import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!  
  }
});

// Function to upload a new file to S3
async function uploadFileToS3(fileBuffer: Buffer, fileName: string) {
  const key = `profile_pics/${fileName}-${Date.now()}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: fileBuffer,
    ContentType: "image/*"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

// Function to delete an old file from S3
async function deleteFileFromS3(fileUrl: string) {
  if (!fileUrl) return;

  // Extract the file key from the full S3 URL
  const key = fileUrl.split('.amazonaws.com/')[1];

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const sex = formData.get("sex") as string;
    const pref = formData.get("pref") as string;
    const contact = formData.get("contact") as string;
    const ctype = formData.get("ctype") as string;
    const file = formData.get("profile_pic") as File | null;

    // Get the current profile picture from the database
    const result = await sql(`SELECT profile_pic FROM users WHERE email = $1;`, [email]);
    const oldProfilePicUrl = result[0]?.profile_pic || null;
    
    let profilePicUrl = oldProfilePicUrl;

    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      // Upload the new file
      profilePicUrl = await uploadFileToS3(fileBuffer, file.name);

      // Delete the old profile picture if it exists
      if (oldProfilePicUrl) {
        await deleteFileFromS3(oldProfilePicUrl);
      }
    }

    const values = [name, sex, pref, contact, ctype, profilePicUrl, email];

    const updateQuery = `UPDATE users 
                         SET name = $1, sex = $2, pref = $3, contact = $4, ctype = $5, profile_pic = $6 
                         WHERE email = $7;`;

    await sql(updateQuery, values);

    return NextResponse.json({ success: true, profilePicUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
