import { usePage } from '@inertiajs/react'
import MessageModal from '../../components/modal/message_modal'
import { useEffect, useState } from 'react'

const Layout = ({ children }) => {
  const { props } = usePage()
  const [message, setMessage] = useState<string>('')
  useEffect(() => {
    setMessage(props.errors as unknown as string)
    const timeOut = (props.errors as unknown as string)?.length * 60

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
