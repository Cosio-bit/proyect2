import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import VehiculoList from './components/VehiculoList';
import VehiculoAdd from './components/VehiculoAdd';
import ReparacionAdd from './components/ReparacionAdd';
import ReparacionList from './components/ReparacionList';
import ReparacionEdit from './components/ReparacionEdit';
import MarcaList from './components/MarcaList';
import MarcaAdd from './components/MarcaAdd';
import PrecioList from './components/PrecioList';
import PrecioAdd from './components/PrecioAdd';
import ReparacionListMarca from './components/ReparacionListMarca';
import ReparacionListTipoMotor from './components/ReparacionListTipoMotor';
import ReparacionListTipoVehiculo from './components/ReparacionListTipoVehiculo';
import BackgroundImage from './components/BackgroundImage';
import CantidadH1 from './components/CantidadH1';
import MontoH1 from './components/MontoH1';
import CantidadH2 from './components/CantidadH2';
import PorcentajeH2 from './components/PorcentajeH2';
import H1 from './components/H1';
import H2 from './components/H2';
import H3 from './components/H3';


const retrowaveImage = `url(https://images6.alphacoders.com/121/1213573.png)`;
const logoImage = "/src/components/logo.png";
function App() {
  return (
      <Router>
          <div className="container"> 
          <Navbar logo={logoImage} />
          <BackgroundImage imageUrl={retrowaveImage}> </BackgroundImage>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/vehiculo/list" element={<VehiculoList/>} />
              <Route path="/vehiculo/add" element={<VehiculoAdd/>} />
              <Route path="/vehiculo/edit/:id" element={<VehiculoAdd/>} />
              <Route path="/reparacion/list" element={<ReparacionList/>} />
              <Route path="/reparacion/list/:idVehiculo" element={<ReparacionList/>} />
              <Route path="/reparacion/add" element={<ReparacionAdd/>} />
              <Route path="/reparacion/add/:idVehiculo" element={<ReparacionAdd/>} />
              <Route path="/reparacion/edit/:id" element={<ReparacionEdit/>} />
              <Route path="/marca/list" element={<MarcaList/>} />
              <Route path="/marca/add" element={<MarcaAdd/>} />
              <Route path="/marca/edit/:id" element={<MarcaAdd/>} />
              <Route path="/reparacion/list/marca/:marca" element={<ReparacionListMarca/>} />
              <Route path="/reparacion/list/tipoMotor/:tipoMotor" element={<ReparacionListTipoMotor/>} />
              <Route path="/reparacion/list/tipoVehiculo/:tipoVehiculo" element={<ReparacionListTipoVehiculo/>} />
              <Route path="/precio/list" element={<PrecioList/>} />
              <Route path="/precio/add" element={<PrecioAdd/>} />
              <Route path="/precio/edit/:id" element={<PrecioAdd/>} />
              <Route path="/cantidadH1" element={<CantidadH1/>} />
              <Route path="/montoH1" element={<MontoH1/>} />
              <Route path="/cantidadH2" element={<CantidadH2/>} />
              <Route path="/porcentajeH2" element={<PorcentajeH2/>} />
              <Route path="/h1" element={<H1/>} />
              <Route path="/h2" element={<H2/>} />
              <Route path="/h3" element={<H3/>} />

              
            </Routes>
          </div>
          
      </Router>
  );
}

export default App
