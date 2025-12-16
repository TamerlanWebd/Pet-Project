'use client'

import { useEffect, useState } from 'react'
import { UserForm } from '@/app/components/UserForm'

export default function Page() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers)
  }, [])

  return (
    <main className="p-6">
      <UserForm onAdded={() => location.reload()} />
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </main>
  )
}
