'use client'

import { useState, useEffect } from 'react'

type User = {
  id: number
  name: string
  email: string
}

type UserFormProps = {
  onUsersChange: (users: User[]) => void
}

export function UserForm({ onUsersChange }: UserFormProps) {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const response = await fetch('/api/users')
    const fetchedUsers = await response.json()
    setUsers(fetchedUsers)
    onUsersChange(fetchedUsers)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!name.trim() || !email.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (editingUserId === null) {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        })
      } else {
        await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUserId, name, email }),
        })
      }

      setName('')
      setEmail('')
      setEditingUserId(null)
      await fetchUsers()
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleEdit(user: User) {
    setName(user.name)
    setEmail(user.email)
    setEditingUserId(user.id)
  }

  async function handleDelete(id: number) {
    await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    await fetchUsers()
  }

  function handleCancelEdit() {
    setName('')
    setEmail('')
    setEditingUserId(null)
  }

  return (
    <div className="christmasCard">
      <form onSubmit={handleSubmit} className="userForm">
        <h1 className="title">
          🎄 CHRISTMAS USERS LIST 🎁
        </h1>

        <div className="inputsRow">
          <div className="inputGroup">
            <label className="label">Name</label>
            <input
              className="input"
              placeholder="Santa Claus"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label className="label">Email</label>
            <input
              className="input"
              placeholder="santa@northpole.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>

        <div className="actionsRow">
          <button
            type="submit"
            className="primaryButton"
            disabled={isSubmitting}
          >
            {editingUserId === null ? 'ADD TO NICE LIST 🎅' : 'SAVE CHANGES ✨'}
          </button>
          {editingUserId !== null && (
            <button
              type="button"
              className="secondaryButton"
              onClick={handleCancelEdit}
            >
              CANCEL
            </button>
          )}
        </div>
      </form>

      <ul className="usersList">
        {users.map((user) => (
          <li key={user.id} className="userItem">
            <div className="userInfo">
              <span className="userName">{user.name}</span>
              <span className="userEmail">{user.email}</span>
            </div>
            <div className="userActions">
              <button
                type="button"
                className="editButton"
                onClick={() => handleEdit(user)}
              >
                EDIT
              </button>
              <button
                type="button"
                className="deleteButton"
                onClick={() => handleDelete(user.id)}
              >
                DELETE
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}