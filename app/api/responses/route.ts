import { neon } from '@neondatabase/serverless';
import { NextResponse, type NextRequest } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);



export async function POST(request: NextRequest) {
  const data = await request.json();
  const values = [...data.responses];
  values.push(data.email);
  console.log(values);
  const insertQuery = `INSERT INTO Responses ( res1, res2, res3, 
  res4, res5, res6, res7, res8, res9, res10, res11, res12, res13, res14, res15, 
  res16, res17, res18, res19, res20, res21, email )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`;
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