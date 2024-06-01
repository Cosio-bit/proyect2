import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import marcaService from "../services/marcaService.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import DropdownTipoMarca from './TipoMarca.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import dayjs from 'dayjs';
import WebFont from 'webfontloader';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#DC0B90', // pink
    },
    secondary: {
      main: '#6effff', // softer cyan
    },
    background: {
      paper: 'rgba(24, 255, 255, 0.2)', // transparent cyan for the card
    },
    text: {
      primary: '#black', // white text for better readability on the dark background
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Retro-futuristic font
  },
});

const AddMarca = () => {
  
  const [nombre, setNombre] = useState("");
  const [fechaBono, setFechaBono] = useState(null);
  const [descuento, setDescuento] = useState(0);
  const [cantidadBonos, setCantidadBonos] = useState(0);
  const { id } = useParams();
  const [titleMarcaForm, setTitleMarcaForm] = useState("");
  const navigate = useNavigate();

  const saveMarca = (e) => {
    e.preventDefault();

    const marca = { 
      nombre,
      fechaBono,
      descuento,
      cantidadBonos,
      id 
    };

    if (id) {
      marcaService.update(marca)
        .then((response) => {
          console.log("marca ha sido actualizado.", response.data);
          navigate("/marca/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del marca.", error);
        });
    } else {
      marcaService.create(marca)
        .then((response) => {
          console.log("marca ha sido añadido.", response.data);
          navigate("/marca/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar crear nuevo empleado.", error);
        });
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'] // Add more font families if needed
      }
    });
    if (id) {
      setTitleMarcaForm("Editar Marca");
      marcaService.get(id)
        .then((marca) => {
          setNombre(marca.data.nombre);
          setFechaBono(marca.data.fechaBono);
          setDescuento(marca.data.descuento);
          setCantidadBonos(marca.data.cantidadBonos);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleMarcaForm("Nueva Marca para un mes");
    }
  }, [id]);

  const handleNombreChange = (nombre) => {
    setNombre(nombre);
  };

  const handleDateChangeBono = (date) => {
    setFechaBono(date);
    console.log(date);
  };

  return (
    <ThemeProvider theme={theme}> 
    
    <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '120%', margin: '0', padding: 40, marginLeft: "-200px"}}>
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
      <h3 style={{ marginBottom: "20px", color: "#000" }}>{titleMarcaForm}</h3>
      <hr style={{ width: "100%", border: "none", borderBottom: "1px solid black", marginBottom: "20px" }} />
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Tooltip title="Seleccione el tipo de marca">
                  <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir la marca para los bonos</Button>
                </Tooltip>
                <FormControl fullWidth>
                  <DropdownTipoMarca onChange={handleNombreChange} />
                </FormControl>
              </Grid>
              <Grid item>
                <Tooltip title="Ingrese la cantidad de bonos">
                  <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir la cantidad de bonos para la marca</Button>
                </Tooltip>
                <FormControl fullWidth>
                  <TextField
                    id="cantidadBonos"
                    label="Cantidad Bonos"
                    type="number"
                    value={cantidadBonos}
                    variant="standard"
                    onChange={(e) => setCantidadBonos(e.target.value)}
                    InputLabelProps={{ style: { color: "#f0f0f0" } }}
                    InputProps={{ style: { color: "#f0f0f0" } }}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Tooltip title="Ingrese cantidad de dinero de descuento">
                  <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir el bono de descuento</Button>
                </Tooltip>
                <FormControl fullWidth>
                  <TextField
                    id="descuento"
                    label="Descuento"
                    type="number"
                    value={descuento}
                    variant="standard"
                    onChange={(e) => setDescuento(e.target.value)}
                    InputLabelProps={{ style: { color: "#f0f0f0" } }}
                    InputProps={{ style: { color: "#f0f0f0" } }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
            <Tooltip title="Seleccione la fecha del bono">
              <Button variant="contained" style={{ marginBottom: '10px', fontFamily: 'Quantico' }}>Elegir la fecha para el bono</Button>
            </Tooltip>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  value={dayjs(fechaBono)}
                  onChange={handleDateChangeBono}
                  textField={<TextField />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveMarca(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </FormControl>
        <hr />
        <Link to="/marca/list">Volver a la Lista</Link>
      </Box>
    </TableContainer>
    </ThemeProvider>
  );
};

export default AddMarca;
