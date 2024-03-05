import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { ReorderIcon } from '../../assets/images/reorder_icon.js'
import { customProps, type PropsType } from '../../stores/custom_props.store.js'
import style from '../../css/text_tab.module.css'
import { useRaisedShadow } from '../../hooks/user_raised_shadow.js'
import type { LinkType } from '../../types/props.type.js'
import { DeletIcon } from '../../assets/images/delete_icon.js'
import { useRef, type ChangeEvent, useEffect, type ElementRef, type FormEvent } from 'react'

export const LinkItems = ({
  item,
  setDatasLinks,
}: {
  item: LinkType[0]
  setDatasLinks(v: LinkType): void
}) => {
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const boxShadow = useRaisedShadow(y)
  const dragListenerRef = useRef<ElementRef<'svg'>>(null)

  useEffect(() => {
    const touchHandler = (e: TouchEvent) => e.preventDefault()
    const iTag = dragListenerRef.current
    if (iTag) {
      iTag.addEventListener('touchstart', touchHandler, { passive: false })
      return () => {
        iTag.removeEventListener('touchstart', touchHandler)
      }
    }
  }, [dragListenerRef])

  function handlechange(e: ChangeEvent<HTMLInputElement>, id: number) {
    let updateState = (prevProps: PropsType) => {
      if (prevProps) {
        const updatedLinks = prevProps.links.map((link) => {
          if (link.id === id) {
            return {
              ...link,
              name: e.target.name === 'name' ? e.target.value : link.name,
              path: e.target.name === 'link' ? e.target.value : link.path,
            }
          }
          return link
        })
        setDatasLinks(updatedLinks as LinkType)

        return {
          ...prevProps,
          links: updatedLinks as LinkType,
        }
      }
    }
    setProps(updateState(props))
  }

  function handleDeleteLink(id: number) {
    const linksArray: LinkType = [...props.links]
    const filteredArray = linksArray.filter((link) => (link.id === id ? false : true)) as LinkType

    setDatasLinks(filteredArray)
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
      <ReorderIcon ref={dragListenerRef} dragControls={dragControls} />
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
          defaultValue={item.path}
          name="link"
          required
          onChange={(e) => handlechange(e, item.id)}
        />
      </label>
    </Reorder.Item>
  )
}
