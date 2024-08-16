import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';


const sql = neon(process.env.DATABASE_URL!);



export async function GET(request: NextRequest, { params }) {
  console.log(params);
  const values = [params.user];
  const insertQuery = `SELECT * FROM Responses
  WHERE email=$1;`;
  try {
    const response = await sql(insertQuery, values);
    console.log(response);
    return new NextResponse(JSON.stringify({ ...response[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new NextResponse(JSON.stringify("unsuccessful"), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}