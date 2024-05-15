const formatList = ():ListElement => ({
  tag: 'ul',
  children: [],
})

const createImg = (item:JSONData):ItemElement => ({
  tag: 'figure',
  children: item.content,
  figcaption: item.figcaption,
})

const handlePushElement = (
  element: BaseElement,
  list: ListElement,
  elements: BaseElement[],
): void => {
  if (list.children.length > 0) {
    elements.push(list, element)
  } else {
    elements.push(element)
  }
}

const createElement = (
  item: JSONData,
  list: ListElement,
): BaseElement | null => {
  switch (item.tag) {
    case 'ul':
      list.children.push({ tag: 'li', children: item.content })
      return null
    case 'img':
      return createImg(item)
    case undefined:
      list.children.push({ tag: 'li', children: item.content })
      return null

    default:
      return { tag: item.tag, children: item.content }
  }
}

export const parseElements = async (data: JSONData[]): Promise<BaseElement[]> => {
  let list = formatList()
  const elements: BaseElement[] = []

  data.forEach((item) => {
    const element = createElement(item, list)
    if (element) {
      handlePushElement(element, list, elements)
      if (list.children.length > 0) list = formatList()
    }
  })

  return elements
}
