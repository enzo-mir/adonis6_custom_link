import { Head } from '@inertiajs/react'
import { useState } from 'react'

import logger_style from '../css/logger.module.css'
import Login from '../components/login'
import Signin from '../components/signin'

export default function Home() {
  const [showLogger, setShowLogger] = useState<'login' | 'signin'>('login')
  return (
    <>
      <Head title="Homepage" />

      <main className={logger_style.main}>
        <section className={logger_style.content}>
          {showLogger === 'login' ? <Login /> : <Signin />}
          <a href="#" onClick={() => setShowLogger(showLogger === 'login' ? 'signin' : 'login')}>
            {showLogger === 'signin' ? 'Have already an account ?' : "Doesn't have an account ?"}
          </a>
        </section>
      </main>
    </>
  )
}
