import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DropdownTipoMarca from "./TipoMarca";
import DropdownTipoMotor from "./TipoMotor";
import DropdownTipoVehiculo from "./TipoVehiculo";
import WebFont from "webfontloader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const VehiculoList = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedOption('');
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleReparacionesMarca = (marca) => {
    navigate(`/reparacion/list/marca/${marca}`);
  };

  const handleReparacionesTipoMotor = (tipoMotor) => {
    navigate(`/reparacion/list/tipoMotor/${tipoMotor}`);
  };

  const handleReparacionesTipoVehiculo = (tipoVehiculo) => {
    navigate(`/reparacion/list/tipoVehiculo/${tipoVehiculo}`);
  };


  const handleButtonClick = () => {
    if (selectedCategory && selectedOption) {
      console.log(`Selected ${selectedCategory}: ${selectedOption}`);
      if (selectedCategory === 'marca') {
        handleReparacionesMarca(selectedOption);
      } else if (selectedCategory === 'motor') {
        handleReparacionesTipoMotor(selectedOption);
      } else if (selectedCategory === 'vehiculo') {
        handleReparacionesTipoVehiculo(selectedOption);
      }
    }
  };

  const navigate = useNavigate();

  const init = () => {
    vehiculoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los vehiculos.", response.data);
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los vehiculos.",
          error
        );
      });
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'] // Add more font families if needed
      }
    });
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehiculo?"
    );
    if (confirmDelete) {
      vehiculoService
        .remove(id)
        .then((response) => {
          console.log("vehiculo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al vehiculo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/vehiculo/edit/${id}`);
  };

  const handleReparacionesVehiculo = (id) => {
    navigate(`/reparacion/list/${id}`);
  };

  const handleAnadirReparacion = (id) => {
    navigate(`/reparacion/add/${id}`);
  }

  
const headerStyle = {
  borderRight: "2px solid #CAB0F3",
  borderBottom: "1px solid #CAB0F3",
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: "#9D1D7D",
  fontFamily: "Audiowide",
  whiteSpace: "nowrap"
};

const bodyStyle = {
  borderRight: "2px solid #CAB0F3",
  borderBottom: "1px solid #CAB0F3",
  fontFamily: "Quantico",
  whiteSpace: "nowrap"
};
return (
  <div
    style={{
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}
  >
    <div
      style={{
        backgroundSize: 'cover',
        minHeight: '10vh',
        marginTop: '10px', // Adjust this value to create space
      }}
    >
    </div>
    <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '130%', margin: '0', padding: 40, marginLeft: "-240px"}}>
      <br />
      <h2 style={{ textAlign: 'center', color: '#9D1D7D', fontFamily: 'Audiowide' }}>Listado de Vehículos</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Link to="/vehiculo/add" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#9D1D7D', color: 'white', fontFamily: 'Quantico' }}
            startIcon={<PersonAddIcon />}
          >
            Añadir Vehiculo
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/reparacion/list')}
          style={{ backgroundColor: '#9D1D7D', color: 'white', fontFamily: 'Quantico' }}
        >
          Lista de Reparaciones
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ color: '#9D1D7D', fontFamily: 'Audiowide', marginLeft: 'auto' }}>
          Puedes filtrar por tipo de motor, vehiculo y marca para ver las reparaciones asociadas a cada uno.
        </p>
            <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="marca">Marca</MenuItem>
          <MenuItem value="motor">Tipo Motor</MenuItem>
          <MenuItem value="vehiculo">Tipo Vehiculo</MenuItem>
        </Select>
      </FormControl>

      {selectedCategory === 'marca' && <DropdownTipoMarca onChange={handleOptionChange} />}
      {selectedCategory === 'motor' && <DropdownTipoMotor onChange={handleOptionChange} />}
      {selectedCategory === 'vehiculo' && <DropdownTipoVehiculo onChange={handleOptionChange} />}

      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: '#9D1D7D', color: 'white', fontFamily: 'Quantico', marginTop: '1rem', marginLeft: 'auto'}}
        onClick={handleButtonClick}
      >
        Elegir Tipo de {selectedCategory} para filtrar reparaciones
      </Button>
    </div>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right" style={headerStyle}>patente</TableCell>
            <TableCell align="right" style={headerStyle}>marca</TableCell>
            <TableCell align="right" style={headerStyle}>modelo</TableCell>
            <TableCell align="right" style={headerStyle}>Año de Fabricación</TableCell>
            <TableCell align="right" style={headerStyle}>Tipo de Vehículo</TableCell>
            <TableCell align="right" style={headerStyle}>Tipo de Motor</TableCell>
            <TableCell align="right" style={headerStyle}>Número de Asientos</TableCell>
            <TableCell align="right" style={headerStyle}>Kilometraje</TableCell>
            <TableCell align="right" style={headerStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehiculos.map((vehiculo) => (
            <TableRow key={vehiculo.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right" style={bodyStyle}>{vehiculo.patente}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.marca}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.modelo}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.annoFabricacion}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.tipoVehiculo}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.tipoMotor}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.nroAsientos}</TableCell>
              <TableCell align="right" style={bodyStyle}>{vehiculo.kilometraje}</TableCell>
              <TableCell align="right" style={bodyStyle}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
  <Button
    variant="contained"
    color="info"
    size="small"
    onClick={() => handleEdit(vehiculo.id)}
    style={{ backgroundColor: '#DC0B90', color: 'black', fontFamily: 'Quantico', width: 'calc(50% - 0.25rem)' }}
    startIcon={<EditIcon />}
  >
    Editar
  </Button>
  <Button
    variant="contained"
    color="error"
    size="small"
    onClick={() => handleDelete(vehiculo.id)}
    style={{ backgroundColor: '#DC0B90', color: 'black', fontFamily: 'Quantico', width: 'calc(50% - 0.25rem)' }}
    startIcon={<DeleteIcon />}
  >
    Eliminar
  </Button>
  <Button
    variant="contained"
    color="secondary"
    size="small"
    onClick={() => handleReparacionesVehiculo(vehiculo.id)}
    style={{ backgroundColor: '#DC0B90', color: 'black', fontFamily: 'Quantico', width: 'calc(50% - 0.25rem)' }}
    startIcon={<EditIcon />}
  >
    Reparaciones
  </Button>
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={() => handleAnadirReparacion(vehiculo.id)}
    style={{ backgroundColor: '#DC0B90', color: 'black', fontFamily: 'Quantico', width: 'calc(50% - 0.25rem)' }}
    startIcon={<EditIcon />}
  >
    Añadir Reparación
  </Button>
</div>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
};

export default VehiculoList;