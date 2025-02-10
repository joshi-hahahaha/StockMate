import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log(process.env.MONGODB_URI);
    const client = await clientPromise;

    // List all databases
    const databases = await client.db().admin().listDatabases();
    console.log("Databases:", databases);

    const db = client.db("StockMate");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections);

    return NextResponse.json({ databases, collections });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Unable to fetch databases or collections" },
      { status: 500 }
    );
  }
}
