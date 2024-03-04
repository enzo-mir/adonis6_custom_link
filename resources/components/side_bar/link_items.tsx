import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from '../../assets/images/reorder_icon.js'
import { customProps } from '../../stores/custom_props.store.js'
import style from '../../css/text_tab.module.css'
import { useRaisedShadow } from '../../hooks/user_raised_shadow.js'
import type { LinkType } from '../../types/props.type.js'
import { DeletIcon } from '../../assets/images/delete_icon.js'
import type { ChangeEvent } from 'react'

export const LinkItems = ({ item }: { item: LinkType[0] }) => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const boxShadow = useRaisedShadow(y)

  function handlechange(e: ChangeEvent<HTMLInputElement>, id: number) {
    function p(prevProps) {
      const updatedLinks = prevProps.links.map((link) => {
        if (link.id === id) {
          return {
            ...link,
            name: e.target.name === 'name' ? e.target.value : link.name,
            link: e.target.name === 'link' ? e.target.value : link.link,
          }
        }
        return link
      })

      return {
        ...prevProps,
        links: updatedLinks,
      }
    }

    setProps(p(props))
  }
  return (
    <Reorder.Item
      value={item}
      className={style.links_container}
      id={item.name}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <ReorderIcon dragControls={dragControls} />
      <DeletIcon />
      <label htmlFor="name">
        <p>Name</p>
        <input
          type="text"
          defaultValue={item.name}
          name="name"
          required
          onChange={(e) => handlechange(e, item.id)}
        />
      </label>
      <label htmlFor="link">
        <p>Link</p>
        <input
          type="url"
          defaultValue={item.link}
          name="link"
          required
          onChange={(e) => handlechange(e, item.id)}
        />
      </label>
    </Reorder.Item>
  )
}
