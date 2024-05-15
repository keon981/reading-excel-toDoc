import { Menu as AntdMenu } from 'antd'
import './menu.css'
import type { MenuItems } from 'src/types/menu.type'

type Props = {
  menu: MenuItems
  selectedKey: string[]
  onSelect: (key: string) => void
}

function Menu({ menu, selectedKey, onSelect }: Props) {
  return (
    <menu className="directions">
      <AntdMenu
        theme="dark"
        mode="inline"
        openKeys={menu.defaultOpenKeys}
        selectedKeys={selectedKey}
        onSelect={(info) => {
          onSelect(info.key)
        }}
        items={menu.items}
        style={{ maxWidth: 300, backgroundColor: 'transparent' }}
      />
    </menu>
  )
}

export default Menu
