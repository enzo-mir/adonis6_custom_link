import { customProps, type PropsType } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import resetBtn from '../../css/cta_form.module.css'
import { useState, type ChangeEvent, type ElementRef, useEffect, useRef } from 'react'
import { Reorder } from 'framer-motion'
import { LinkItems } from './link_items'
import type { LinkType } from '../../types/props.type'
import { usePage } from '@inertiajs/react'
import { DeletIcon } from '../../assets/images/delete_icon'

export const TextTab = () => {
  const { props: pageProps }: { props: PropsType } = usePage()
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const [links, setLinks] = useState<Array<{ id: number; name: string; link: string }>>(props.links)
  const headerFormRef = useRef<ElementRef<'form'>>(null)
  const linkFormRef = useRef<ElementRef<'form'>>(null)
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

  function handleAddLink() {
    const linksArray: LinkType = props.links
    function getHigherId() {
      const ids = props.links.map((link) => link.id)
      return Math.max(...ids)
    }
    linksArray.push({
      id: getHigherId() + 1,
      name: 'google link',
      link: 'https://www.google.com/',
    })

    setProps({
      ...props,
      links: linksArray,
    })
  }
  return (
    <>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        ref={headerFormRef}
        className={style.header_container}
      >
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
        <div className={style.cta_container}>
          <button
            className={resetBtn.save_button}
            type="button"
            onClick={(e) => {
              ;(e.currentTarget.parentNode as HTMLFormElement).reset()
              setProps({ ...props, links: pageProps.links })
            }}
          >
            Save
          </button>
          <button
            className={resetBtn.reset_button}
            type="button"
            onClick={(e) => {
              ;(e.currentTarget.parentNode as HTMLFormElement).reset()
              setProps({ ...props, header_content: pageProps.header_content })
            }}
          >
            Reset
          </button>
        </div>
      </form>
      <form action="" ref={linkFormRef} className={style.form_Link}>
        <div className={style.header_link}>
          <h2>Links</h2>
          <button onClick={handleAddLink} type="button">
            <DeletIcon onPointerDown={() => {}} />
          </button>
        </div>

        <Reorder.Group className={style.wrapper_links} axis="y" onReorder={setLinks} values={links}>
          {props.links.map((item) => {
            return <LinkItems key={item.id} item={item} />
          })}
        </Reorder.Group>
        <div className={style.cta_container}>
          <button
            className={resetBtn.save_button}
            type="button"
            onClick={(e) => {
              linkFormRef.current.reset()
              setProps({ ...props, links: pageProps.links })
            }}
          >
            Save
          </button>
          <button
            className={resetBtn.reset_button}
            type="button"
            onMouseDown={(e) => {
              linkFormRef.current.reset()
              setProps({ ...props, links: pageProps.links })
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  )
}