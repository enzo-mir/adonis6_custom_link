import style from '../../css/sidebar.module.css'
import { useState } from 'react'
import burgerIcon from '../../assets/images/burger-menu.svg'
import closeIcon from '../../assets/images/close-button.svg'
import { StyleTab } from './styles_tab'
import { TextTab } from './texts_tab'
import { AnimatePresence } from 'framer-motion'
const SideBar = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<'style' | 'text'>('style')

  return (
    <>
      <button className={style.openButton} onClick={() => setOpenSideBar(true)}>
        <img src={burgerIcon} alt="burger button to open tab bar" />
      </button>
      <aside className={style.aside} data-open={openSideBar}>
        <div>
          <nav>
            <button onClick={() => setOpenSideBar(false)}>
              <img src={closeIcon} alt="burger button to close tab bar" />
            </button>
            <ul>
              <li
                data-active={currentTab === 'style' ? 'true' : 'false'}
                onClick={() => setCurrentTab('style')}
              >
                Styles
              </li>
              <li
                data-active={currentTab === 'text' ? 'true' : 'false'}
                onClick={() => setCurrentTab('text')}
              >
                Texts
              </li>
            </ul>
          </nav>
          <AnimatePresence>
            {currentTab === 'style' ? <StyleTab /> : currentTab === 'text' ? <TextTab /> : null}
          </AnimatePresence>
        </div>
        <a href="/logout" className={style.logout}>
          Logout
        </a>
      </aside>
    </>
  )
}

export default SideBar
