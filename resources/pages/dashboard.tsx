import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeStore } from '../stores/theme.store'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar/side_bar'
import Layout from './layout/layout'
import type { PropsType } from '../types/props.type'
import { customProps } from '../stores/custom_props.store'
import { AnimatePresence, Reorder, motion } from 'framer-motion'

const dashboard = (props: PropsType) => {
  const theme = themeStore((state) => state.theme)
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [propsStore, setPropsStore] = customProps((state) => [state.props, state.setProps])

  return (
    <ThemeProvider theme={theme || props.style}>
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
                      <a href={link.link} target="_blank">
                        {link.name}
                      </a>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
            <button onClick={() => setOpenPreview(openPreview ? false : true)}>Preview</button>
          </article>
        </DashboardSection>
        <SideBar />
      </DashboardMain>
    </ThemeProvider>
  )
}

dashboard.layout = (page: HTMLElement) => <Layout children={page} />

export default dashboard
