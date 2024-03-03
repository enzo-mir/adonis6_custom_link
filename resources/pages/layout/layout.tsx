import { usePage } from '@inertiajs/react'
import MessageModal from '../../components/modal/message_modal'
import { useEffect, useState } from 'react'
import { themeStore } from '../../stores/theme.store'
import type { PropsType } from '../../types/props.type'

const Layout = ({ children }) => {
  const { props }: { props: PropsType } = usePage()
  const [message, setMessage] = useState<string>('')
  const setTheme = themeStore((state) => state.setTheme)
  useEffect(() => {
    setTheme(props.style)
    setMessage(props.errors)
    const timeOut = props.errors?.length * 60

    setTimeout(
      () => {
        setMessage('')
      },
      timeOut >= 2500 ? timeOut : 2500
    )
  }, [props])
  return (
    <>
      {props.errors && <MessageModal message={message} open={message ? true : false} />}
      {children}
    </>
  )
}

export default Layout
