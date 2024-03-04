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
  const [links, setLinks] = useState<Array<{ id: number; name: string; link: string }>>(props.links)
  const headerFormRef = useRef<ElementRef<'form'>>(null)
  const linkFormRef = useRef<ElementRef<'form'>>(null)
  const user = userDatas((state) => state.user)
  const { post, data, setData } = useForm<HeaderProps>({
    title: props.header_content.title,
    description: props.header_content.description,
  })

  useEffect(() => {
    setProps({
      ...props,
      links: links as LinkType,
    })
  }, [links])
  function handleChangeHeader(e: ChangeEvent<ElementRef<'input'>>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    setProps({
      ...props,
      header_content: data,
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
  function handleSubmitHeader(e: FormEvent) {
    e.preventDefault()
    post(`/users/${user.id}/header`, { data })
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
              setData(pageProps.header_content)
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
