import { useState } from 'react'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar/side_bar'
import Layout from './layout/layout'
import type { PropsType } from '../types/props.type'
import { customProps } from '../stores/custom_props.store'
import { AnimatePresence, motion } from 'framer-motion'
import { userDatas } from '../stores/user_datas.store'
import MessageModal from '../components/modal/message_modal'
const dashboard = (props: PropsType) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [propsStore, setPropsStore] = customProps((state) => [state.props, state.setProps])
  const [copyLink, setCopyLink] = useState<boolean>(false)
  const user = userDatas((state) => state.user)
  return (
    <>
      <AnimatePresence>
        {copyLink ? (
          <MessageModal message={'Link copied to clipboard !'} open={copyLink} type={'success'} />
        ) : null}
      </AnimatePresence>
      <DashboardMain>
        <DashboardSection
          className={openPreview ? 'preview' : null}
          as={motion.section}
          initial={{ opacity: 0, y: -50, boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)' }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: '0 20px 20px 0px rgba(0, 0, 0, 0.3)',
            transition: { duration: 0.5 },
          }}
        >
          <article>
            <h1>{propsStore.header_content?.title}</h1>
            <h2>{propsStore.header_content?.description}</h2>
            <ul>
              <AnimatePresence>
                {propsStore.links.map((link, id) => {
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.3 } }}
                      exit={{ opacity: 0 }}
                    >
                      <a href={link.path} target="_blank">
                        {link.name}
                      </a>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
            <div>
              <button onClick={() => setOpenPreview(openPreview ? false : true)}>Preview</button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/${user.username}`)
                  setCopyLink(true)
                  setTimeout(() => {
                    setCopyLink(false)
                  }, 2500)
                }}
              >
                Copy Link
              </button>
            </div>
          </article>
        </DashboardSection>
        <SideBar />
      </DashboardMain>
    </>
  )
}

dashboard.layout = (page: HTMLElement) => <Layout children={page} />

export default dashboard
