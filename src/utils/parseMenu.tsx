import type { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'
import type { MenuItems } from 'src/types/menu.type'

const createPushItemHandler = (items: AnchorLinkItemProps[], defaultOpenKeys: string[]) => {
  return (item: AnchorLinkItemProps) => {
    items.push(item)
    defaultOpenKeys.push(`${item?.key}`)
  }
}

export const parseMenu = async (data: BaseElement[]): Promise<MenuItems> => {
  const items: AnchorLinkItemProps[] = []
  const defaultOpenKeys: string[] = []
  const handlePushItem = createPushItemHandler(items, defaultOpenKeys)

  data.forEach((item, index) => {
    const createdId = (num: number) => `H${num}-${item.children}-${index}`

    switch (item.tag) {
      case 'h1':
        handlePushItem({
          key: `H1-${item.children}-${index}`,
          href: `#${createdId(1)}`,
          title: <div className="title-hr gap-2">{item.children}</div>,
        })
        break
      case 'h2':
        handlePushItem({
          key: createdId(2),
          href: `#${createdId(2)}`,
          title: <span style={{ paddingLeft: '32px' }}>{item.children}</span>,
        })
        break
      case 'h3':
        handlePushItem({
          key: createdId(3),
          href: `#${createdId(3)}`,
          title: <span style={{ paddingLeft: '64px' }}>{item.children}</span>,
        })
        break
      default:
        break
    }
  })

  return { items, defaultOpenKeys }
}
