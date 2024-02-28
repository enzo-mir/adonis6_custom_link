import { useForm } from '@inertiajs/react'
import React, { type ChangeEvent, type FormEvent } from 'react'

export default function Signin() {
  const { data, setData, post, processing } = useForm({
    username: '',
    email: '',
    password: '',
  })
  function handleChangeValue(e: ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>Username</p>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            onChange={handleChangeValue}
            required
            placeholder=""
          />
        </label>
        <label htmlFor="username">
          <p>email</p>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChangeValue}
            required
            placeholder=""
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangeValue}
            required
            placeholder=""
          />
        </label>
        <button disabled={processing} type="submit">
          Signin
        </button>
      </form>
    </>
  )
}
