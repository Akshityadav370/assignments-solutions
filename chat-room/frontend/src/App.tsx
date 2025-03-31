import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Room from './pages/Room';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room' element={<Room />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
