import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Locsoltak from './Locsoltak'
import SearchResult from './Searchresult'
import MyMenu from './Mymenu'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <MyMenu />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locsoltak/:id" element={<Locsoltak />} />
            <Route path="/search/:searchedWord" element={<SearchResult />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App