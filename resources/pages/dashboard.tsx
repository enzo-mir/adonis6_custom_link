import { useRef, type ElementRef, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeStore, type Theme } from '../stores/theme.store'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar'
import Layout from './layout/layout'
import type { PropsType } from '../types/props.type'

const dashboard = (props: PropsType) => {
  const theme = themeStore((state) => state.theme)
  const sectionRef = useRef<ElementRef<'section'>>(null)

  return (
    <ThemeProvider theme={theme || props.style}>
      <DashboardMain>
        <DashboardSection ref={sectionRef}>
          <article>
            <h1>{props.header_content?.title}</h1>
            <h2>{props.header_content?.description}</h2>
            <ul>
              {props.names.map((name, id) => {
                return (
                  <li key={id}>
                    <a href={props.links[id]} target="_blank">
                      {name}
                    </a>
                  </li>
                )
              })}
            </ul>
            <button onClick={() => sectionRef.current.classList.add('preview')}>Preview</button>
          </article>
        </DashboardSection>
        <SideBar />
      </DashboardMain>
    </ThemeProvider>
  )
}

dashboard.layout = (page: HTMLElement) => <Layout children={page} />

export default dashboard
