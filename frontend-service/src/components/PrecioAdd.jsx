import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import precioService from "../services/precio.service.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
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
      primary: '#000', // black text for better readability
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Retro-futuristic font
  },
});

const AddPrecio = () => {
  
  const [tipoPrecio, setTipoPrecio] = useState("");
  const [precioDiesel, setPrecioDiesel] = useState(0);
  const [precioGasolina, setPrecioGasolina] = useState(0);
  const [precioHibrido, setPrecioHibrido] = useState(0);
  const [precioElectrico, setPrecioElectrico] = useState(0);
  const { id } = useParams();
  const [titlePrecioForm, setTitlePrecioForm] = useState("");
  const navigate = useNavigate();

  const savePrecio = (e) => {
    e.preventDefault();

    const precio = { 
      tipoPrecio,
      precioDiesel,
      precioGasolina,
      precioHibrido,
      precioElectrico,
      id 
    };

    if (id) {
      precioService.update(precio)
        .then((response) => {
          console.log("precio ha sido actualizado.", response.data);
          navigate("/precio/list");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del precio.", error);
        });
    } else {
      precioService.create(precio)
        .then((response) => {
          console.log("precio ha sido añadido.", response.data);
          navigate("/precio/list");
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
      setTitlePrecioForm("Editar Precio");
      precioService.get(id)
        .then((precio) => {
          setTipoPrecio(precio.data.tipoPrecio);
          setPrecioDiesel(precio.data.precioDiesel);
          setPrecioGasolina(precio.data.precioGasolina);
          setPrecioHibrido(precio.data.precioHibrido);
          setPrecioElectrico(precio.data.precioElectrico);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitlePrecioForm("Nueva Precio para un mes");
    }
  }, [id]);


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
      <h3 style={{ marginBottom: "20px", color: "#000" }}>{titlePrecioForm}</h3>
      <hr style={{ width: "100%", border: "none", borderBottom: "1px solid black", marginBottom: "20px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="tipoPrecio"
              label="Nombre de reparación"
              value={tipoPrecio}
              variant="standard"
              onChange={(e) => setTipoPrecio(e.target.value)}
              helperText="Ej. ABC123"
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="precioDiesel"
              label="precio Diesel"
              type="number"
              value={precioDiesel}
              variant="standard"
              onChange={(e) => setPrecioDiesel(e.target.value)}
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="precioGasolina"
              label="precio Gasolina"
              type="number"
              value={precioGasolina}
              variant="standard"
              onChange={(e) => setPrecioGasolina(e.target.value)}
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="precioHibrido"
              label="precio Hibrido"
              type="number"
              value={precioHibrido}
              variant="standard"
              onChange={(e) => setPrecioHibrido(e.target.value)}
              InputLabelProps={{ style: { color: "#000" } }}
              InputProps={{ style: { color: "#000" } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              id="precioElectrico"
              label="precio Electrico"
              type="number"
              value={precioElectrico}
              variant="standard"
              onChange={(e) => setPrecioElectrico(e.target.value)}
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
          onClick={(e) => savePrecio(e)}
          style={{ marginLeft: "0.5rem" }}
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </FormControl>
      <hr />
      <Link to="/precio/list">Volver a la Lista</Link>
    </Box>
    </TableContainer>
    </ThemeProvider>
  );
};

export default AddPrecio;
