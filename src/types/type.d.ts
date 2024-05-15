type JSONData = {
  tag?: JSX.IntrinsicElements
  content: string
  figcaption?: string
}

type ItemElement = {
  tag: JSX.ElementType,
  children: string
  figcaption?: string
}

type ListElement = {
  tag: 'ul',
  children: ItemElement[]
}

type BaseElement = ListElement | ItemElement
