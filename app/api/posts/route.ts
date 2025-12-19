import { db } from "@/app/db/client";
import { posts } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const allPosts = await db.select().from(posts);
  return Response.json(allPosts);
}

export async function POST(request: Request) {
  const { title, content, authorId } = await request.json();

  if (!title?.trim() || !content?.trim() || !authorId) {
    throw new Error("Invalid input");
  }

  const inserted = await db
    .insert(posts)
    .values({
      title,
      content,
      authorId,
    })
    .returning();

  return Response.json(inserted[0]);
}

export async function PUT(request: Request) {
  const { id, title, content } = await request.json();

  if (!title?.trim() || !content?.trim()) {
    throw new Error("Invalid input");
  }

  const updated = await db
    .update(posts)
    .set({ title, content })
    .where(eq(posts.id, id))
    .returning();

  return Response.json(updated[0]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await db.delete(posts).where(eq(posts.id, id));
  return new Response(null, { status: 204 });
}
