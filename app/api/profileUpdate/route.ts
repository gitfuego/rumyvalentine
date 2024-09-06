import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);
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
  const data = await request.json();
  const {name, sex, pref, contact, ctype} = data.responses;
  const values = [name, sex, pref, contact, ctype];
  values.push(data.email);
  const updateQuery = `UPDATE users SET name = $1, sex = $2, pref = $3, contact = $4, ctype = $5
  WHERE email = $6;`;
  try {
    await sql(updateQuery, values);
    return NextResponse.json({success:true})
  } catch (error) {
    return NextResponse.json({error,success: false})
  }
}