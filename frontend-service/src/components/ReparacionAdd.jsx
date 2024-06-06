import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import 'react-datetime/css/react-datetime.css';
import  DropdownTipoReparacion  from './TipoReparacion';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";



const AddReparacion = () => {
    const { idVehiculo } = useParams();
    const [vehiculoId, ] = useState(parseInt(idVehiculo)); // Parse idVehiculo as integer
    const [fechaHoraIngreso, setFechaHoraIngreso] = useState(null);
    const [fechaHoraSalida, setFechaHoraSalida] = useState(null);
    const [fechaHoraRetiro, setFechaHoraRetiro] = useState(null);
    const [tipoReparacion, setTipoReparacion] = useState("");
    const [montoTotal, ] = useState(0); // Assuming montoTotal is a number
    const [titleReparacionForm, setTitleReparacionForm] = useState("");
    const [id] = useState(0); // According to the entity
    const navigate = useNavigate();

    

    const saveReparacion = (e) => {
        e.preventDefault();

        const reparacion = { 
            idVehiculo: vehiculoId, // Use vehiculoId instead of idVehiculo
            fechaHoraIngreso, 
            fechaHoraSalida, 
            fechaHoraRetiro, 
            tipoReparacion, 
            montoTotal,
            id
        };
        
        reparacionService
        Promise.all([
            reparacionService.create(reparacion) // Update repair's total amount
          ])
            .then((response) => {
                console.log("reparacion ha sido añadido.", response.data);
                navigate("/reparacion/list");
            })
            .catch((error) => {
                console.log(
                    "Ha ocurrido un error al intentar crear nueva reparacion.",
                    error
                );
            });
    };

    useEffect(() => {
        setTitleReparacionForm("Agregar reparacion");
    }, []);

    const handleDateChangeIngreso = (date) => {
        setFechaHoraIngreso(date);
    };

    const handleDateChangeSalida = (date) => {
        setFechaHoraSalida(date);
    };

    const handleDateChangeRetiro = (date) => {
        setFechaHoraRetiro(date);
    };

    const handleTipoReparacionChange = (tipoReparacion) => {
        setTipoReparacion(tipoReparacion);
    }

  return (   <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    component="form"
    style={{
      backgroundColor: "#8c9eff", // Very pale lilac background color
      minHeight: "100vh", // Ensure the same height as the previous container
      padding: "20px",
      color: "#000", // Adjust text color to black
    }}
  >
    <h3 style={{ marginBottom: "20px", color: "#000" }}>{titleReparacionForm}</h3>
    <hr style={{ width: "100%", border: "none", borderBottom: "1px solid black", marginBottom: "20px" }} />
      <hr />
      <form>
    <FormControl fullWidth>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <h2 style={{ color: '#333', margin: '0' }}>Fecha de Ingreso</h2>
            <div style={{ flex: '1' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                        value={dayjs(fechaHoraIngreso)}
                        onChange={handleDateChangeIngreso}
                        textField={<TextField />}
                        />
                </LocalizationProvider>
            </div>
            
        </div>
    </div>
</FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Fecha de Salida</h2>
                <div style={{ flex: '1' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                        value={dayjs(fechaHoraSalida)}
                        onChange={handleDateChangeSalida}
                        textField={<TextField />}
                        />
                </LocalizationProvider>
                </div>
                
            
            </div>
        </FormControl>
        

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Fecha de Retiro</h2>
                <div style={{ flex: '1' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateTimePicker
                        value={dayjs(fechaHoraRetiro)}
                        onChange={handleDateChangeRetiro}
                        textField={<TextField />}
                        />
                </LocalizationProvider>
                </div>
               
               
            </div>
        </FormControl>

        <DropdownTipoReparacion onChange={handleTipoReparacionChange} />

        
        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveReparacion(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar reparacion autofix
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/reparacion/list">Volver a la Lista</Link>
    </Box>
  );
};

export default AddReparacion;