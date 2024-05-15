import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

import { parseMenu } from 'src/utils/parseMenu'
import { parseElements } from 'src/utils/parseElements'
import type { MenuItems } from 'src/types/menu.type'

type Hook = () => [BaseElement[], MenuItems]

const fileName = '說明書_測試'

const useParseExcel: Hook = () => {
  const [jsonData, setJsonData] = useState<BaseElement[]>([])
  const [menuList, setMenuList] = useState<MenuItems>({ items: [], defaultOpenKeys: [] })

  const fetchExcelData = async (): Promise<JSONData[]> => {
    try {
      const res = await fetch(`public/${fileName}.xlsx`)
      const buffer = await res.arrayBuffer()
      const wb = XLSX.read(buffer, { type: 'buffer' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws) as JSONData[]
      return data
    } catch (error) {
      return []
    }
  }

  useEffect(() => {
    (async function fn() {
      const data = await fetchExcelData()
      const elements: BaseElement[] = await parseElements(data)
      const menu = await parseMenu(elements)
      setJsonData(elements)
      setMenuList(menu)
    }())
  }, [])

  return [jsonData, menuList]
}

export default useParseExcel
