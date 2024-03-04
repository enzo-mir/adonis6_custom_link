import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from '../../assets/images/reorder_icon.js'
import { customProps, type PropsType } from '../../stores/custom_props.store.js'
import style from '../../css/text_tab.module.css'
import { useRaisedShadow } from '../../hooks/user_raised_shadow.js'
import type { LinkType } from '../../types/props.type.js'
import { DeletIcon } from '../../assets/images/delete_icon.js'
import { useRef, type ChangeEvent, type PointerEvent, useEffect } from 'react'

export const LinkItems = ({ item }: { item: LinkType[0] }) => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const boxShadow = useRaisedShadow(y)
  const iRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) => e.preventDefault()

    const iTag = iRef.current

    if (iTag) {
      //@ts-ignore
      iTag.addEventListener('touchstart', touchHandler, { passive: false })

      return () => {
        //@ts-ignore
        iTag.removeEventListener('touchstart', touchHandler, {
          passive: false,
        })
      }
    }
  }, [iRef])

  function handlechange(e: ChangeEvent<HTMLInputElement>, id: number) {
    let updateState: (prevProps: PropsType) => PropsType = function (
      prevProps: PropsType
    ): PropsType {
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
        links: updatedLinks as LinkType,
      }
    }
    setProps(updateState(props))
  }

  function handleDeleteLink(id: number) {
    const linksArray: LinkType = [...props.links]
    const filteredArray = linksArray.filter((link) => (link.id === id ? false : true)) as LinkType
    setProps({
      ...props,
      links: filteredArray,
    })
  }
  return (
    <Reorder.Item
      value={item}
      className={style.links_container}
      id={item.name}
      dragListener={false}
      style={{ boxShadow, y }}
      dragControls={dragControls}
      initial={{
        opacity: 0,
        height: '0%',
      }}
      animate={{
        opacity: 1,
        height: '100%',
        transition: { duration: 0.3 },
      }}
      exit={{
        opacity: 0,
        height: '0%',
      }}
    >
      <ReorderIcon ref={iRef} dragControls={dragControls} />
      <DeletIcon onPointerDown={() => handleDeleteLink(item.id)} />
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
