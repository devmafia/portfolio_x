import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/Home'
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home></Home>}>

            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
