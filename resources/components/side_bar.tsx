import { themeStore, type Theme } from '../stores/theme.store'
import style from '../css/sidebar.module.css'
import type { ChangeEvent } from 'react'
import { usePage } from '@inertiajs/react'
import type { PropsType } from '../types/props.type'
import { useDebounce } from '../hooks/use_debounce'
const SideBar = () => {
  const [theme, setTheme] = themeStore((state) => [state.theme, state.setTheme])
  const { props }: { props: PropsType } = usePage()
  const propsStyle = props.style
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setTheme({
      ...theme,
      [e.target.name]: !Number.isNaN(value) ? `${value}px` : value,
    })
  }

  const debouncedHandleChange = useDebounce(handleChange, 1)
  return (
    <aside className={style.aside}>
      <button>Close</button>
      <form action="">
        <label htmlFor="body">
          Background color
          <input
            type="color"
            name="body"
            id="body"
            onChange={debouncedHandleChange}
            defaultValue={theme?.body || propsStyle.body}
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
          />
        </label>
        <label htmlFor="bg_links">
          Background color links
          <input
            type="color"
            name="body"
            id="body"
            defaultValue={theme?.bg_links || propsStyle.bg_links}
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
        </label>
      </form>
    </aside>
  )
}

export default SideBar
