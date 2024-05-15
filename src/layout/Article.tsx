import {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react'
import type { ArticleRef } from 'src/types/ref.type'

type Props = {
  data: BaseElement[]
  listenScrollEvent: () => void
}

const Article = forwardRef<ArticleRef, Props>(({ data, listenScrollEvent }, ref) => {
  const baseRef = useRef<HTMLElement>(null)
  const articleRef = useRef<ArticleRef>(new Map())

  useImperativeHandle(ref, () => articleRef.current)

  useEffect(() => {
    if (!baseRef.current) return
    baseRef.current.addEventListener('scroll', listenScrollEvent)

    // eslint-disable-next-line consistent-return
    return () => {
      baseRef.current?.removeEventListener('scroll', listenScrollEvent)
    }
  }, [])

  return (
    <article className="directions" ref={baseRef}>
      {data.map((item, key) => {
        const tagkey = `${item.tag}-${key + 1}`
        const TagName = item.tag

        switch (item.tag) {
          case 'ul':
            return (
              <ul className="directions" key={tagkey}>
                {(item.children as ItemElement[]).map((child, index) => {
                  const listKey = index + 1
                  return <li key={listKey}>{child.children}</li>
                })}
              </ul>
            )
          case 'p1':
            return (
              <p className="directions bg" key={tagkey}>
                {item.children}
              </p>
            )
          case 'figure':
            return (
              <figure className="directions" key={tagkey}>
                <img src={`public/manual-img/${item.children}`} alt={item.children} />
                <figcaption>{item.figcaption}</figcaption>
              </figure>
            )
          case 'h1':
            return (
              <h1
                id={`H1-${item.children}-${key}`}
                className="directions"
                key={tagkey}
                ref={(el) => { articleRef.current.set(`H1-${item.children}-${key}`, el) }}
              >{item.children}
              </h1>
            )
          case 'h2':
            return (
              <h2
                id={`H2-${item.children}-${key}`}
                ref={(el) => { articleRef.current.set(`H2-${item.children}-${key}`, el) }}
                className="directions title-hr"
                key={tagkey}
              >{item.children}
              </h2>
            )
          case 'h3':
            return (
              <h3
                id={`H3-${item.children}-${key}`}
                ref={(el) => { articleRef.current.set(`H3-${item.children}-${key}`, el) }}
                className="directions title-hr"
                key={tagkey}
              >{item.children}
              </h3>
            )
          default:
            return <TagName className="directions" key={tagkey}>{item.children}</TagName>
        }
      })}
    </article>
  )
})

export default Article
