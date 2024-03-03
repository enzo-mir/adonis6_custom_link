import { customProps } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { LinkItems } from './link_items'

export const TextTab = () => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  let linksArray = []
  for (let id = 0; id < props.links.names.length; id++) {
    const name = props.links.names[id]
    const url = props.links.urls[id]
    linksArray.push({ id, name, url })
  }
  const [links, setLinks] = useState(linksArray)

  return (
    <form action="">
      <h2>Header</h2>
      <label htmlFor="title">
        <p>Title</p>
        <input type="text" />
      </label>
      <label htmlFor="description">
        <p>Description</p>
        <input type="text" />
      </label>
      <h2>Links</h2>
      <Reorder.Group
        as="form"
        className={style.wrapper_links}
        axis="y"
        onReorder={setLinks}
        values={links}
      >
        {links.map((item, id) => {
          return <LinkItems key={item.id} item={item} />
        })}
      </Reorder.Group>
    </form>
  )
}
