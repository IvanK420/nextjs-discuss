import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { username } from "better-auth/plugins";
import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await getDb();
  const messages = await db.collection("message").find().toArray();
  return NextResponse.json(messages);
}
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { content } = await request.json();
  if (!content) {
    return NextResponse.json({ error: "message vide" }, { status: 400 });
  };
  const db = await getDb();
  const message = {
    content: content,
    createdAt : new Date(),
    userid : session.user.id,
    userName : session.user.name
  };
  await db.collection("message").insertOne(message);
  return NextResponse.json(message, {status:201})
}
