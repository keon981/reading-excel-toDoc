import {
  BrowserRouter, Outlet, Route, Routes,
} from 'react-router-dom'

import './App.css'
import ManualPage from './page/ManualPage'

function Root() {
  return (
    <>
      <header>User Manual</header>
      <Outlet />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<ManualPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
