import { useRef, type ChangeEvent, type FormEvent, type ElementRef } from 'react'
import { useDebounce } from '../../hooks/use_debounce'
import { themeStore, type Theme } from '../../stores/theme.store'
import type { PropsType } from '../../types/props.type'
import { useForm, usePage } from '@inertiajs/react'
import style from '../../css/sidebar.module.css'
import resetBtn from '../../css/cta_form.module.css'
import { userDatas } from '../../stores/user_datas.store'

export const StyleTab = () => {
  const [theme, setTheme] = themeStore((state) => [state.theme, state.setTheme])
  const { props }: { props: PropsType } = usePage()
  const styleFormRef = useRef<ElementRef<'form'>>(null)
  const user = userDatas((state) => state.user)
  const propsStyle = props.style
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setData({
      ...data,
      [e.target.name]: !Number.isNaN(Number.parseInt(value)) ? `${value}px` : value,
    })
    setTheme(data)
  }
  const { post, data, setData, processing } = useForm<Theme>({
    body: props.style.body,
    text: props.style.text,
    bg_links: props.style.bg_links,
    border_radius: props.style.border_radius,
    header_color: props.style.header_color,
  })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    post(`/users/${user.id}/style`, {
      data,
      onSuccess: (pr) => {
        console.log(pr)
      },
    })
  }

  const debouncedHandleChange = useDebounce(handleChange, 1)
  return (
    <form onSubmit={handleSubmit} ref={styleFormRef} className={style.form}>
      <label htmlFor="body">
        Background color
        <input
          type="color"
          name="body"
          id="body"
          onChange={debouncedHandleChange}
          defaultValue={theme?.body || propsStyle.body}
          title={theme?.body}
        />
      </label>
      <label htmlFor="header_color">
        Header text color
        <input
          type="color"
          name="header_color"
          id="header_color"
          onChange={debouncedHandleChange}
          defaultValue={theme?.header_color || propsStyle.header_color}
          title={theme?.header_color}
        />
      </label>
      <label htmlFor="text">
        Text links color
        <input
          type="color"
          name="text"
          id="text"
          onChange={debouncedHandleChange}
          defaultValue={theme?.text || propsStyle.text}
          title={theme?.text}
        />
      </label>
      <label htmlFor="bg_links">
        Background color links
        <input
          type="color"
          name="bg_links"
          id="bg_links"
          onChange={debouncedHandleChange}
          defaultValue={theme?.bg_links || propsStyle.bg_links}
          title={theme?.bg_links}
        />
      </label>
      <label htmlFor="border_radius">
        Border radius links
        <input
          type="range"
          name="border_radius"
          id="border_radius"
          max={20}
          min={0}
          defaultValue={
            Number.parseInt(theme?.border_radius.split('px', 1)[0]) ||
            Number.parseInt(propsStyle.border_radius.split('px', 1)[0])
          }
          onChange={debouncedHandleChange}
        />
        <p>
          {Number.parseInt(theme?.border_radius.split('px', 1)[0]) ||
            Number.parseInt(propsStyle.border_radius.split('px', 1)[0])}
        </p>
      </label>
      <div className={style.cta_container}>
        <button className={resetBtn.save_button} type="submit" disabled={processing}>
          Save
        </button>
        <button
          className={resetBtn.reset_button}
          type="button"
          onMouseDown={(e) => {
            styleFormRef.current.reset()
            setTheme(props.style)
            setData(props.style)
          }}
        >
          Reset
        </button>
      </div>
    </form>
  )
}
