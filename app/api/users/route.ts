
import { db } from '@/app/db/client'
import { users } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { validateUserInput } from '@/app/lib/validateUser'
export async function GET() {
  const allUsers = await db.select().from(users)
  return Response.json(allUsers)
}

export async function POST(request: Request) {
  const { name, email } = await request.json()
  validateUserInput(name, email)
  const inserted = await db.insert(users).values({ name, email }).returning()
  return Response.json(inserted[0])
}

export async function PUT(request: Request) {
  const { id, name, email } = await request.json()
  validateUserInput(name, email)
  const updated = await db.update(users).set({ name, email }).where(eq(users.id, id)).returning()
  return Response.json(updated[0])
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await db.delete(users).where(eq(users.id, id))
  return new Response(null, { status: 204 })
}
