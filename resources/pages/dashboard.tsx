import { useState } from 'react'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar/side_bar'
import Layout from './layout/layout'
import type { PropsType } from '../types/props.type'
import { customProps } from '../stores/custom_props.store'
import { AnimatePresence, motion } from 'framer-motion'
import { userDatas } from '../stores/user_datas.store'
const dashboard = (props: PropsType) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [propsStore, setPropsStore] = customProps((state) => [state.props, state.setProps])
  const user = userDatas((state) => state.user)
  return (
    <DashboardMain>
      <DashboardSection className={openPreview ? 'preview' : null}>
        <article>
          <h1>{propsStore.header_content?.title}</h1>
          <h2>{propsStore.header_content?.description}</h2>
          <ul>
            <AnimatePresence>
              {propsStore.links.map((link, id) => {
                return (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, height: '0%' }}
                    animate={{ opacity: 1, height: '100%', transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, height: '0%' }}
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
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${user.id}`)}
            >
              Copy Link
            </button>
          </div>
        </article>
      </DashboardSection>
      <SideBar />
    </DashboardMain>
  )
}

dashboard.layout = (page: HTMLElement) => <Layout children={page} />

export default dashboard
