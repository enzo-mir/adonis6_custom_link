import { useForm } from '@inertiajs/react'
import { type ChangeEvent, type FormEvent } from 'react'

export default function Login() {
  const { data, setData, post, processing } = useForm({
    username: '',
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
    post('/auth/login', { data })
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>Username</p>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            required
            placeholder=""
            onChange={handleChangeValue}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            placeholder=""
            onChange={handleChangeValue}
          />
        </label>
        <button disabled={processing} type="submit">
          Login
        </button>
      </form>
    </>
  )
}
