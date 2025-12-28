import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Farmers from './pages/Farmers';
import SmallScaleIndustry from './pages/SmallScaleIndustry';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import FarmerForm from './components/Register/FarmerRegister';
import IndustryForm from './components/Register/IndustryRegister';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/farmer" element={<Farmers />} />
        <Route path='/small-scale-industry' element={<SmallScaleIndustry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/farmer-form' element={<FarmerForm />} />
        <Route path='/industry-form' element={<IndustryForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;