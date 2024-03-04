import { customProps } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import { useState, type ChangeEvent, type ElementRef } from 'react'
import { Reorder } from 'framer-motion'
import { LinkItems } from './link_items'

export const TextTab = () => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const [links, setLinks] = useState(
    props.links as unknown as Array<{ id: number; name: string; link: string }>
  )
  function handleChangeHeader(e: ChangeEvent<ElementRef<'input'>>) {
    setProps({
      ...props,
      header_content: {
        ...props.header_content,
        [e.target.name]: e.target.value,
      },
    })
    console.log(props)
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
