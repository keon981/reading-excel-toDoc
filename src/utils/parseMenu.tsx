import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { MenuItems } from 'src/types/menu.type'

const createPushItemHandler = (items: ItemType[], defaultOpenKeys: string[]) => {
  return (item: ItemType) => {
    items.push(item)
    defaultOpenKeys.push(`${item?.key}`)
  }
}

export const parseMenu = async (data: BaseElement[]): Promise<MenuItems> => {
  const items: ItemType[] = []
  const defaultOpenKeys: string[] = []
  const handlePushItem = createPushItemHandler(items, defaultOpenKeys)

  data.forEach((item, index) => {
    switch (item.tag) {
      case 'h1':
        handlePushItem({
          key: `H1-${item.children}-${index}`,
          label: <div className="title-hr gap-2">{item.children}</div>,
        })
        break
      case 'h2':
        handlePushItem({
          key: `H2-${item.children}-${index}`,
          label: <span style={{ paddingLeft: '32px' }}>{item.children}</span>,
        })
        break
      case 'h3':
        handlePushItem({
          key: `H3-${item.children}-${index}`,
          label: <span style={{ paddingLeft: '64px' }}>{item.children}</span>,
        })
        break
      default:
        break
    }
  })

  return { items, defaultOpenKeys }
}
