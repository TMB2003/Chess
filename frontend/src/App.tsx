import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './screens/Landing'
import { Game } from './screens/Game'

function App() {
  return (
    <div className='h-screen bg-slate-900'>
      <BrowserRouter>
        <Routes>
          <Route key="home" path='/' element={<Landing />} />
          <Route key="game" path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
