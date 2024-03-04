import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from '../../assets/images/reorder_icon.js'
import { customProps } from '../../stores/custom_props.store.js'
import style from '../../css/text_tab.module.css'
import { useRaisedShadow } from '../../hooks/user_raised_shadow.js'
import type { LinkType } from '../../types/props.type.js'
import { DeletIcon } from '../../assets/images/delete_icon.js'

export const LinkItems = ({ item }: { item: LinkType[0] }) => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const boxShadow = useRaisedShadow(y)
  return (
    <Reorder.Item
      value={item}
      className={style.links_container}
      id={item.name}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <label htmlFor="name">
        <p>Name</p>
        <input type="text" defaultValue={item.name} required />
      </label>
      <label htmlFor="link">
        <p>Link</p>
        <input type="url" defaultValue={item.link} required />
      </label>
      <ReorderIcon dragControls={dragControls} />
      <DeletIcon />
    </Reorder.Item>
  )
}
