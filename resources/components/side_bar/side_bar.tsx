import style from '../../css/sidebar.module.css'
import { useState } from 'react'
import burgerIcon from '../../assets/images/burger-menu.svg'
import closeIcon from '../../assets/images/close-button.svg'
import { StyleTab } from './styles_tab'
import { TextTab } from './texts_tab'
const SideBar = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(true)
  const [currentTab, setCurrentTab] = useState<'style' | 'text' | 'images'>('style')

  return (
    <>
      {!openSideBar ? (
        <button className={style.openButton} onClick={() => setOpenSideBar(true)}>
          <img src={burgerIcon} alt="burger button to open tab bar" />
        </button>
      ) : null}
      <aside className={style.aside} data-open={openSideBar}>
        <nav>
          <button onClick={() => setOpenSideBar(false)}>
            <img src={closeIcon} alt="burger button to close tab bar" />
          </button>
          <ul>
            <li
              aria-active={currentTab === 'style' ? 'true' : 'false'}
              onClick={() => setCurrentTab('style')}
            >
              Styles
            </li>
            <li
              aria-active={currentTab === 'text' ? 'true' : 'false'}
              onClick={() => setCurrentTab('text')}
            >
              Texts
            </li>
            <li
              aria-active={currentTab === 'images' ? 'true' : 'false'}
              onClick={() => setCurrentTab('images')}
            >
              Images
            </li>
          </ul>
        </nav>

        {currentTab === 'style' ? <StyleTab /> : currentTab === 'text' ? <TextTab /> : null}
      </aside>
    </>
  )
}

export default SideBar