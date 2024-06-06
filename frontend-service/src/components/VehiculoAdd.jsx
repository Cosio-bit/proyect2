import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import DropdownTipoMarca from './TipoMarca.jsx';
import DropdownTipoVehiculo from './TipoVehiculo.jsx';
import DropdownTipoMotor from './TipoMotor.jsx';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TableContainer from "@mui/material/TableContainer";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const AddVehiculo = () => {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [annoFabricacion, setAnnoFabricacion] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [tipoMotor, setTipoMotor] = useState("");
  const [nroAsientos, setNroAsientos] = useState(0);
  const [kilometraje, setKilometraje] = useState(0);
  const { id } = useParams();
  const [titleVehiculoForm, setTitleVehiculoForm] = useState("");
  const navigate = useNavigate();

  const saveVehiculo = (e) => {
    e.preventDefault();
    const vehiculo = { patente, marca, modelo, annoFabricacion, tipoVehiculo, tipoMotor, nroAsientos, kilometraje, id };
    
    if (id) {
      vehiculoService.update(vehiculo).then((response) => {
        console.log("vehiculo ha sido actualizado.", response.data);
        navigate("/vehiculo/list");
      }).catch((error) => {
        console.log("Ha ocurrido un error al intentar actualizar datos del vehiculo.", error);
      });
    } else {
      vehiculoService.create(vehiculo).then((response) => {
        console.log("vehiculo ha sido añadido.", response.data);
        navigate("/vehiculo/list");
      }).catch((error) => {
        console.log("Ha ocurrido un error al intentar crear nuevo empleado.", error);
      });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleVehiculoForm("Editar Vehiculo");
      vehiculoService.get(id).then((vehiculo) => {
        setPatente(vehiculo.data.patente);
        setMarca(vehiculo.data.marca);
        setModelo(vehiculo.data.modelo);
        setAnnoFabricacion(vehiculo.data.annoFabricacion);
        setTipoVehiculo(vehiculo.data.tipoVehiculo);
        setTipoMotor(vehiculo.data.tipoMotor);
        setNroAsientos(vehiculo.data.nroAsientos);
        setKilometraje(vehiculo.data.kilometraje);
      }).catch((error) => {
        console.log("Se ha producido un error.", error);
      });
    } else {
      setTitleVehiculoForm("Nuevo Vehiculo");
    }
  }, [id]);

  const handleMarcaChange = (marca) => {
    setMarca(marca);
  }

  const handleTipoVehiculoChange = (tipoVehiculo) => {
    setTipoVehiculo(tipoVehiculo);
  }

  const handleTipoMotorChange = (tipoMotor) => {
    setTipoMotor(tipoMotor);
  }

  // Handler function to update the state with the selected year
  const handleYearChange = (year) => {
    // Convert the selected year to a string
    const selectedYear = year.toString();
    setAnnoFabricacion(selectedYear);
  };

  return (
    <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '100%', margin: '0', padding: 40 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        style={{
          minHeight: "100vh",
          padding: "20px",
          color: "#000",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#000" }}>{titleVehiculoForm}</h3>
        <hr style={{ width: "100%", border: "none", borderBottom: "1px solid black", marginBottom: "20px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Ingrese la patente del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Ingresar Patente</Button>
            </Tooltip>
            <FormControl fullWidth>
              <TextField
                id="patente"
                label="Patente"
                value={patente}
                variant="standard"
                onChange={(e) => setPatente(e.target.value)}
                helperText="Ej. ABC123"
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </FormControl>

            <Tooltip title="Seleccione la marca del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir Marca</Button>
            </Tooltip>
            <FormControl fullWidth>
              <DropdownTipoMarca onChange={handleMarcaChange} />
            </FormControl>

            <Tooltip title="Ingrese el modelo del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Ingresar Modelo</Button>
            </Tooltip>
            <FormControl fullWidth>
              <TextField
                id="modelo"
                label="Modelo"
                value={modelo}
                variant="standard"
                onChange={(e) => setModelo(e.target.value)}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </FormControl>

            <Tooltip title="Ingrese el año de fabricación del vehículo">
        <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Ingresar Año de Fabricación</Button>
      </Tooltip>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Año de Fabricación"
            views={['year']}
            value={annoFabricacion ? dayjs().year(parseInt(annoFabricacion)) : null} // Convert the string back to a Day.js object when setting the value
            onChange={(date) => handleYearChange(date.year())} // Update state with the selected year
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>

            <Tooltip title="Seleccione el tipo de vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir Tipo de Vehículo</Button>
            </Tooltip>
            <FormControl fullWidth>
              <DropdownTipoVehiculo onChange={handleTipoVehiculoChange} />
            </FormControl>

            <Tooltip title="Seleccione el tipo de motor del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir Tipo de Motor</Button>
            </Tooltip>
            <FormControl fullWidth>
              <DropdownTipoMotor onChange={handleTipoMotorChange} />
            </FormControl>

            <Tooltip title="Ingrese el número de asientos del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Ingresar Número de Asientos</Button>
            </Tooltip>
            <FormControl fullWidth>
              <TextField
                id="nroAsientos"
                label="Número de Asientos"
                type="number"
                value={nroAsientos}
                variant="standard"
                onChange={(e) => setNroAsientos(e.target.value)}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </FormControl>

            <Tooltip title="Ingrese el kilometraje del vehículo">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Ingresar Kilometraje</Button>
            </Tooltip>
            <FormControl fullWidth>
              <TextField
                id="kilometraje"
                label="Kilometraje"
                type="number"
                value={kilometraje}
                variant="standard"
                onChange={(e) => setKilometraje(e.target.value)}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </FormControl>

          </Grid>
        </Grid>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveVehiculo(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </FormControl>
        <hr />
        <Link to="/vehiculo/list">Volver a la Lista</Link>
      </Box>
    </TableContainer>
  );
};

export default AddVehiculo;
