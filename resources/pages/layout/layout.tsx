import { usePage } from '@inertiajs/react'
import MessageModal from '../../components/modal/message_modal'
import { useEffect, useState } from 'react'
import { themeStore } from '../../stores/theme.store'
import type { PropsType } from '../../types/props.type'
import { customProps } from '../../stores/custom_props.store'
import { userDatas } from '../../stores/user_datas.store'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

const Layout = ({ children }) => {
  const { props }: { props: PropsType } = usePage()
  const [message, setMessage] = useState<string>('')
  const setProps = customProps((state) => state.setProps)
  const [theme, setTheme] = themeStore((state) => [state.theme, state.setTheme])
  const setUser = userDatas((state) => state.setUser)
  useEffect(() => {
    props.style && setTheme(props.style)
    props.links &&
      setProps({
        links: props.links,
        header_content: props.header_content,
      })
    props.user && setUser(props.user)

    props.errors && setMessage(props.errors)
    props.success && setMessage(props.success)
    const timeOut = message?.length * 60

    setTimeout(
      () => {
        setMessage('')
      },
      timeOut >= 2500 ? timeOut : 2500
    )
  }, [props])

  return (
    <ThemeProvider theme={theme || props.style}>
      <AnimatePresence>
        {props.errors ? (
          <MessageModal message={message} open={message ? true : false} type="error" />
        ) : props.success ? (
          <MessageModal message={message} open={message ? true : false} type="success" />
        ) : null}
      </AnimatePresence>
      {children}
    </ThemeProvider>
  )
}

export default Layout
