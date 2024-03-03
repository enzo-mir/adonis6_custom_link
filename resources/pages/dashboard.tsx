import { useEffect, useRef, type ElementRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeStore, type Theme } from '../stores/theme.store'
import { DashboardMain, DashboardSection } from '../components/style/dashboard_style'
import SideBar from '../components/side_bar'

type DashboardProps = {
  user: {
    email: string
    username: string
  }
  names: string[]
  links: string[]
  header_content: {
    title: string
    description: string
  }
  images: Array<string>
  style: Theme
}

const dashboard = (props: DashboardProps) => {
  const [theme, setTheme] = themeStore((state) => [state.theme, state.setTheme])
  const sectionRef = useRef<ElementRef<'section'>>(null)
  useEffect(() => {
    setTheme(props.style)
  }, [])

  return (
    <ThemeProvider theme={theme}>
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

export default dashboard
