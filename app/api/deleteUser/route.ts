import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from '../auth/[...nextauth]/authOptions';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!  
  }
});

const sql = neon(process.env.DATABASE_URL!);

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

export async function DELETE(request: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new NextResponse(
        JSON.stringify({ successful: false, error: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const email = session.user.email; // Get email from session

    const profile = await sql(`SELECT profile_pic FROM users WHERE email = $1;`, [email]);
    const oldProfilePicUrl = profile[0]?.profile_pic || null;

    // Delete the old profile picture if it exists
    if (oldProfilePicUrl) {
      await deleteFileFromS3(oldProfilePicUrl);
    }
    
    // Delete responses first to avoid foreign key errors
    await sql(`DELETE FROM Responses WHERE email = $1;`, [email]);

    // Delete user after responses are removed
    const result = await sql(`DELETE FROM Users WHERE email = $1 RETURNING *;`, [email]);

    const successful = result.length > 0;

    return new NextResponse(
      JSON.stringify({ successful }),
      { status: successful ? 200 : 404, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse(
      JSON.stringify({ successful: false, error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
