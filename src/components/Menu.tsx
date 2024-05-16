import { Anchor } from 'antd'
import type { MenuItems } from 'src/types/menu.type'
import './menu.css'

type Props = {
  menu: MenuItems
}

function Menu({ menu }: Props) {
  const onChange = (link: string) => {
    const element = document.querySelector(`a.ant-anchor-link-title[href="${link}"]`)
    if (element) element.scrollIntoView({ block: 'center' })
  }

  return (
    <menu className="directions">
      <nav className="directions-sidebar">
        <Anchor
          affix={false}
          items={menu.items}
          bounds={96}
          onChange={onChange}
          replace
        />
      </nav>
    </menu>
  )
}

export default Menu
