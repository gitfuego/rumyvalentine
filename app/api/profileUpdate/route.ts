import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY!,
//     secretAccessKey: process.env.S3_SECRET_KEY!  
//   }
// });

// async function uploadFileToS3(file, fileName) {
//   const fileBuffer = file;
//   console.log(fileName)
//   const params = {
//     Bucket: "rumv",
//     Key: `${fileName}-${Date.now()}`,
//     Body: fileBuffer,
//     ContentType: "image/*"
//   }

//   const command = new PutObjectCommand(params);
//   await s3Client.send(command);
//   return fileName;
// }

export async function POST(request: NextRequest) {
  try {

    return NextResponse.json({success:true})
  } catch (error) {
    return NextResponse.json({error,success: false})
  }
}