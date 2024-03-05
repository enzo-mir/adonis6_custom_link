import type { PropsType } from '~/types/props.type'
import { MainCustomPage } from '../components/style/custom_page_style'
import Layout from './layout/layout'

const custom = (props: PropsType) => {
  console.log(props)

  return (
    <MainCustomPage>
      <article>
        <h1>{props.header_content.title}</h1>
        <h2>{props.header_content.description}</h2>
        <ul>
          {props.links.map((link, index) => {
            return (
              <li key={link.id}>
                {props.images && <img src={props.images[index]}></img>}
                <a href={link.path} target="_blank">
                  {link.name}
                </a>
              </li>
            )
          })}
        </ul>
      </article>
    </MainCustomPage>
  )
}

custom.layout = (page: HTMLElement) => <Layout children={page} />

export default custom
