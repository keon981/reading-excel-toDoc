import React from 'react'
import useParseExcel from 'src/hooks/useParseExcel'
import Article from '../layout/Article'
import Menu from '../components/Menu'

function ManualPage() {
  const [jsonData, menu] = useParseExcel()
  return (
    <main className="directions-wrapper">
      <Menu menu={menu} />
      <Article data={jsonData} />
    </main>
  )
}

export default ManualPage
