import { Head } from '@inertiajs/react'
import React, { Suspense, useState } from 'react'
const Login = React.lazy(() => import('../components/login'))
const Signin = React.lazy(() => import('../components/signin'))
import logger_style from '../css/logger.module.css'

export default function Home() {
  const [showLogger, setShowLogger] = useState<'login' | 'signin'>('login')
  return (
    <>
      <Head title="Homepage" />

      <main className={logger_style.main}>
        <section className={logger_style.content}>
          <Suspense fallback={<p>Loading</p>}>
            {showLogger === 'login' ? <Login /> : <Signin />}
          </Suspense>
          <a href="#" onClick={() => setShowLogger(showLogger === 'login' ? 'signin' : 'login')}>
            {showLogger === 'signin' ? 'Have already an account ?' : "Doesn't have an account ?"}
          </a>
        </section>
      </main>
    </>
  )
}
