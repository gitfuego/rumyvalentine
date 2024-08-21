import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';


const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest, { params }) {
  const values = [params.user];
  const selectQuery = `SELECT * FROM Responses
  WHERE email=$1;`;
  try {
    const response = await sql(selectQuery, values);
    if (response[0]) {
      return new NextResponse(JSON.stringify({ ...response[0] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new NextResponse(JSON.stringify("unsuccessful"), {
        status: 501,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}