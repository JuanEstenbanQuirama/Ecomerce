
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProdustDetail, Purchases } from './pages'
import { LoadingScreen, NavBar, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'



function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProdustDetail />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='/purchases' element={<Purchases />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export default App
