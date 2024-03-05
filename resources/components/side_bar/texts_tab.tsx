import { customProps, type PropsType } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import resetBtn from '../../css/cta_form.module.css'
import {
  useState,
  type ChangeEvent,
  type ElementRef,
  useEffect,
  useRef,
  type FormEvent,
} from 'react'
import { Reorder } from 'framer-motion'
import { LinkItems } from './link_items'
import type { HeaderProps, LinkType } from '../../types/props.type'
import { useForm, usePage } from '@inertiajs/react'
import { DeletIcon } from '../../assets/images/delete_icon'
import { userDatas } from '../../stores/user_datas.store'

export const TextTab = () => {
  const { props: pageProps }: { props: PropsType } = usePage()
  const [props, setProps] = customProps((state) => [state.props, state.setProps])
  const [links, setLinks] = useState<Array<{ id: number; name: string; path: string }>>(
    props.links.urls
  )
  const headerFormRef = useRef<ElementRef<'form'>>(null)
  const linkFormRef = useRef<ElementRef<'form'>>(null)
  const user = userDatas((state) => state.user)
  const {
    post: postHeader,
    data: dataHeader,
    setData: setDataHeader,
  } = useForm<HeaderProps>({
    title: props.header_content.title,
    description: props.header_content.description,
  })

  const {
    post: postLinks,
    data: dataLinks,
    setData: setDataLinks,
  } = useForm<LinkType>(props.links.urls)

  useEffect(() => {
    setProps({
      ...props,
      links: { ...props.links, urls: links as unknown as LinkType },
    })
  }, [links])
  function handleChangeHeader(e: ChangeEvent<ElementRef<'input'>>) {
    setDataHeader({
      ...dataHeader,
      [e.target.name]: e.target.value,
    })
    setProps({
      ...props,
      header_content: {
        ...props.header_content,
        [e.target.name]: e.target.value,
      },
    })
  }

  function handleSubmitLinks(e: FormEvent) {
    e.preventDefault()
    postLinks(`/users/${user.id}/links`, { data: { links: dataLinks } })
  }

  function handleAddLink() {
    const linksArray: LinkType = props.links.urls
    function getHigherId() {
      const ids = props.links.urls.map((link) => link.id)
      return Math.max(...ids)
    }
    linksArray.push({
      id: getHigherId() + 1,
      name: 'google link',
      path: 'https://www.google.com/',
    })

    setProps({
      ...props,
      links: { ...props.links, urls: linksArray },
    })
  }
  function handleSubmitHeader(e: FormEvent) {
    e.preventDefault()
    postHeader(`/users/${user.id}/header`, { data: dataHeader })
  }

  return (
    <>
      <form onSubmit={handleSubmitHeader} ref={headerFormRef} className={style.header_container}>
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
          />
        </label>
        <div className={style.cta_container}>
          <button className={resetBtn.save_button} type="submit">
            Save
          </button>
          <button
            className={resetBtn.reset_button}
            type="button"
            onClick={(e) => {
              headerFormRef.current.reset()
              setDataHeader(pageProps.header_content)
              setProps({ ...props, header_content: pageProps.header_content })
            }}
          >
            Reset
          </button>
        </div>
      </form>
      <form ref={linkFormRef} onSubmit={handleSubmitLinks} className={style.form_Link}>
        <div className={style.header_link}>
          <h2>Links</h2>
          <button onClick={handleAddLink} type="button">
            <DeletIcon onPointerDown={() => {}} />
          </button>
        </div>

        <Reorder.Group className={style.wrapper_links} axis="y" onReorder={setLinks} values={links}>
          {props.links.urls.map((item) => {
            return (
              <LinkItems
                key={item.id}
                item={item}
                setDatasLinks={setDataLinks}
                datasLinks={dataLinks}
              />
            )
          })}
        </Reorder.Group>
        <div className={style.cta_container}>
          <button className={resetBtn.save_button} type="submit">
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
