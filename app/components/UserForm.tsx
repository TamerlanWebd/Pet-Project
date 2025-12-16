'use client'

import { useState } from 'react'

export function UserForm({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    setName('')
    setEmail('')
    onAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Add User</button>
    </form>
  )
}
