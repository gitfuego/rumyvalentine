import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);



export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data)
  const values = [data.email];
  const insertQuery = `UPDATE Users SET agreed = true WHERE email = $1;`;
  let successful = false;
  try {
    await sql(insertQuery, values);
    successful = true;
    return new NextResponse(JSON.stringify({ successful }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new NextResponse(JSON.stringify({ successful }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}