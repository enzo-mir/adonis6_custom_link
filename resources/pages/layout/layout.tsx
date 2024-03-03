import { usePage } from '@inertiajs/react'
import MessageModal from '../../components/modal/message_modal'
import { useEffect, useState } from 'react'
import { themeStore } from '../../stores/theme.store'
import type { PropsType } from '../../types/props.type'
import { customProps } from '../../stores/custom_props.store'

const Layout = ({ children }) => {
  const { props }: { props: PropsType } = usePage()
  const [message, setMessage] = useState<string>('')
  const setProps = customProps((state) => state.setProps)
  const setTheme = themeStore((state) => state.setTheme)
  useEffect(() => {
    setTheme(props.style)
    setProps({
      links: {
        urls: props.links.urls,
        names: props.links.names,
      },
      header_content: props.header_content,
      images: props.images,
    })
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
