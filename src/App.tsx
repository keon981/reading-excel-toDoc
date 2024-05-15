import { useEffect, useRef, useState } from 'react'
import type { ArticleRef } from 'src/types/ref.type'

import useParseExcel from './hooks/useParseExcel'
import './App.css'
import Article from './layout/Article'
import Menu from './components/Menu'

function App() {
  const [jsonData, menu] = useParseExcel()
  const articleRef = useRef<ArticleRef>(new Map())
  const [selectedKey, setSelectedKey] = useState<string[]>([])

  const getArticleMap = () => articleRef.current

  useEffect(() => {
    const firstKey = menu.defaultOpenKeys[0]
    setSelectedKey([firstKey])
  }, [menu.defaultOpenKeys])

  const listenScrollEvent = () => {
    console.log('觸')

    const threshold = window.innerHeight * 0.1
    let activeKey = menu.defaultOpenKeys[0]
    let isKeySet = false

    articleRef.current.forEach((el, key) => {
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top < threshold && rect.bottom > 0) {
          activeKey = key
          isKeySet = true
        }
      }
    })

    if (isKeySet) setSelectedKey([activeKey])
  }

  const handleSelect = (key: string) => {
    const map = getArticleMap()
    const element = map.get(key)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header>User Manual</header>
      <section className="directions-wrapper">
        <Menu menu={menu} selectedKey={selectedKey} onSelect={handleSelect} />
        <Article data={jsonData} ref={articleRef} listenScrollEvent={listenScrollEvent} />
      </section>
    </>
  )
}

export default App
