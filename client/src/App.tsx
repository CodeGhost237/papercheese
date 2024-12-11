import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Home from './assets/pages/Home'
import Auth from './assets/pages/Auth'

function App(){

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
