import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("products").insertOne(body);

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to insert product" }, { status: 500 });
  }
}
