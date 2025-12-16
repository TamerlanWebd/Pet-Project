'use client'

import { useState, useEffect } from 'react'
import { UserForm } from './components/UserForm'

type User = {
  id: number
  name: string
  email: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    document.body.classList.add('christmasBody')
    return () => {
      document.body.classList.remove('christmasBody')
    }
  }, [])

  return (
    <main className="pageContainer">
      <div className="snowLayer snowLayerBack" />
      <div className="snowLayer snowLayerMid" />
      <div className="snowLayer snowLayerFront" />
      <div className="gradientGlow" />
      <UserForm onUsersChange={setUsers} />
    </main>
  )
}
