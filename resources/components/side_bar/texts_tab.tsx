import { customProps, type PropsType } from '../../stores/custom_props.store'
import style from '../../css/text_tab.module.css'
import resetBtn from '../../css/cta_form.module.css'
import { type ChangeEvent, type ElementRef, useEffect, useRef, type FormEvent } from 'react'
import { Reorder, motion } from 'framer-motion'
import { LinkItems } from './link_items'
import type { HeaderProps, LinkType } from '../../types/props.type'
import { useForm, usePage } from '@inertiajs/react'
import { DeletIcon } from '../../assets/images/delete_icon'
import { userDatas } from '../../stores/user_datas.store'
export const TextTab = () => {
  const { props }: { props: PropsType } = usePage()
  const [propsStore, setPropsStore] = customProps((state) => [state.props, state.setProps])
  const headerFormRef = useRef<ElementRef<'form'>>(null)
  const linkFormRef = useRef<ElementRef<'form'>>(null)
  const user = userDatas((state) => state.user)
  const {
    post: postHeader,
    data: dataHeader,
    setData: setDataHeader,
  } = useForm<HeaderProps>({
    title: propsStore.header_content.title,
    description: propsStore.header_content.description,
  })

  const {
    post: postLinks,
    data: dataLinks,
    setData: setDataLinks,
  } = useForm<LinkType>(propsStore.links)

  useEffect(() => {
    setPropsStore({
      ...propsStore,
      links: dataLinks as unknown as LinkType,
    })
  }, [dataLinks])
  function handleChangeHeader(e: ChangeEvent<ElementRef<'input'>>) {
    setDataHeader({
      ...dataHeader,
      [e.target.name]: e.target.value,
    })
    setPropsStore({
      ...propsStore,
      header_content: {
        ...propsStore.header_content,
        [e.target.name]: e.target.value,
      },
    })
  }

  function handleSubmitLinks(e: FormEvent) {
    e.preventDefault()
    postLinks(`/users/${user.id}/links`, { data: { links: dataLinks } })
  }

  function handleAddLink() {
    const linksArray: LinkType = propsStore.links
    function getHigherId() {
      if (propsStore.links.length) {
        const ids = propsStore.links.map((link) => link.id)
        return Math.max(...ids) + 1
      }
      return 0
    }

    linksArray.push({
      id: getHigherId(),
      name: 'Google link',
      path: 'https://www.google.com/',
    })

    setPropsStore({
      ...propsStore,
      links: linksArray,
    })
  }
  function handleSubmitHeader(e: FormEvent) {
    e.preventDefault()
    postHeader(`/users/${user.id}/header`, { data: dataHeader })
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onSubmit={handleSubmitHeader}
        ref={headerFormRef}
        className={style.header_container}
      >
        <h2>Header</h2>
        <label htmlFor="title">
          <p>Title</p>
          <input
            type="text"
            name="title"
            defaultValue={propsStore.header_content.title}
            onChange={handleChangeHeader}
            required
          />
        </label>
        <label htmlFor="description">
          <p>Description</p>
          <input
            type="text"
            name="description"
            defaultValue={propsStore.header_content.description}
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
              setDataHeader(props.header_content)
              setPropsStore({ ...propsStore, header_content: props.header_content })
            }}
          >
            Reset
          </button>
        </div>
      </motion.form>
      <form ref={linkFormRef} onSubmit={handleSubmitLinks} className={style.form_Link}>
        <div className={style.header_link}>
          <h2>Links</h2>
          <button onClick={handleAddLink} type="button">
            <DeletIcon onPointerDown={() => {}} />
          </button>
        </div>

        <Reorder.Group
          className={style.wrapper_links}
          axis="y"
          onReorder={setDataLinks}
          values={dataLinks}
        >
          {dataLinks.map((item) => {
            return <LinkItems key={item.id} item={item} setDatasLinks={setDataLinks} />
          })}
        </Reorder.Group>
        <div className={style.cta_container_link}>
          <button className={resetBtn.save_button} type="submit">
            Save
          </button>
          <button
            className={resetBtn.reset_button}
            type="button"
            onClick={(e) => {
              linkFormRef.current.reset()
              setPropsStore({ ...propsStore, links: props.links })
              setDataLinks(props.links)
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  )
}
