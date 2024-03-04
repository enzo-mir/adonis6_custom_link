import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeStore } from '../stores/theme.store'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar/side_bar'
import Layout from './layout/layout'
import type { PropsType } from '../types/props.type'
import { customProps } from '../stores/custom_props.store'

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
              {props.links.map((link, id) => {
                return (
                  <li key={id}>
                    <a href={link.link} target="_blank">
                      {link.name}
                    </a>
                  </li>
                )
              })}
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
