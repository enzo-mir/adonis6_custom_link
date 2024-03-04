import { customProps } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import { useState, type ChangeEvent, type ElementRef, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { LinkItems } from './link_items'
import type { LinkType } from '../../types/props.type'

export const TextTab = () => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const [links, setLinks] = useState<Array<{ id: number; name: string; link: string }>>(props.links)

  useEffect(() => {
    setProps({
      ...props,
      links: links as LinkType,
    })
  }, [links])
  function handleChangeHeader(e: ChangeEvent<ElementRef<'input'>>) {
    setProps({
      ...props,
      header_content: {
        ...props.header_content,
        [e.target.name]: e.target.value,
      },
    })
  }
  return (
    <>
      <form action="" className={style.header_container}>
        <h2>Header</h2>
        <label htmlFor="title">
          <p>Title</p>
          <input
            type="text"
            name="title"
            defaultValue={props.header_content.title}
            onChange={handleChangeHeader}
            required
          />
        </label>
        <label htmlFor="description">
          <p>Description</p>
          <input
            type="text"
            name="description"
            defaultValue={props.header_content.description}
            onChange={handleChangeHeader}
            required
          />
        </label>
      </form>
      <form action="" className={style.form_Link}>
        <h2>Links</h2>
        <Reorder.Group className={style.wrapper_links} axis="y" onReorder={setLinks} values={links}>
          {links.map((item) => {
            return <LinkItems key={item.id} item={item} />
          })}
        </Reorder.Group>
      </form>
    </>
  )
}
