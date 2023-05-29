
import './App.css';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/about';
import Contact from './Pages/contact';
import NavBar from './Components/navbar';
export default function App() {
  return (
    <div>
    
    <BrowserRouter>
    <div>
    <NavBar />
    </div>
    <div style={{ display: 'flex' }}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
      </Routes>
      </div>
    </BrowserRouter>
    </div>
    );
}
