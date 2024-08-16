import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);



export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data)
  const values = [...data.responses];
  values.push(data.email);
  const insertQuery = `INSERT INTO Responses ( res1, res2, res3, email )
  VALUES ($1, $2, $3, $4);`;
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