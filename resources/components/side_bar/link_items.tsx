import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from '../../assets/images/reorder_icon.js'
import { customProps } from '../../stores/custom_props.store.js'
import style from '../../css/sidebar.module.css'
import { useRaisedShadow } from '../../hooks/user_raised_shadow.js'

export const LinkItems = ({ item }) => {
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
      <span>{item.name}</span>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  )
}
