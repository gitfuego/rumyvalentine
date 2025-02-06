import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY!,
		secretAccessKey: process.env.S3_SECRET_KEY!,
	}
});

async function uploadFileToS3(file, fileName) {
	const fileBuffer = file;
	console.log(fileName);

	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${fileName}`,
		Body: fileBuffer,
		ContentType: "image/*"
	};

	const command = new PutObjectCommand(params);
	await s3Client.send(command);

	const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
	return imageUrl;
}

export async function POST(request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if(!file) {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		} 

		const buffer = Buffer.from(await file.arrayBuffer());
		const imageUrl = await uploadFileToS3(buffer, file.name);

		return NextResponse.json({ success: true, imageUrl });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
