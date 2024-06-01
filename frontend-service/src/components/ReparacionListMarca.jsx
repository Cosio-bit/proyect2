import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacionService.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import WebFont from "webfontloader";

const ReparacionList = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { marca } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'] // Add more font families if needed
      }
    });
    init(marca); // Pasamos el parámetro marca cuando está presente
  }, [marca]); // Dependencias del efecto
  
  const init = () => {
    //si es numero entonces es idVehiculo, si no es marca
    
      if (marca) {
      reparacionService
        .getByMarca(marca)
        .then((response) => {
          console.log(`Mostrando listado de todas las reparaciones de la marca ${marca}.`, response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            `Se ha producido un error al intentar mostrar listado de todas las reparaciones de la marca ${marca}.`,
            error
          );
        });
    } else {
      reparacionService
        .getAll()
        .then((response) => {
          console.log("Mostrando listado de todos las reparaciones.", response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            "Se ha producido un error al intentar mostrar listado de todas las reparaciones.",
            error
          );
        });
    }
  };
  const calcularTiempoPromedio = (reparacionesData) => {
    let sumaTiempos = 0;
    reparacionesData.forEach((reparacion) => {
      if (reparacion.fechaHoraSalida && reparacion.fechaHoraIngreso) {
        sumaTiempos += new Date(reparacion.fechaHoraSalida) - new Date(reparacion.fechaHoraIngreso);
      }
    });
    const totalReparaciones = reparacionesData.length;
    const tiempoPromedio = totalReparaciones > 0 ? sumaTiempos / totalReparaciones : 0;
    return tiempoPromedio;
  };
  

   // Función para formatear el tiempo neto
   const formatTiempoNeto = (tiempoNeto) => {
    const dias = Math.floor(tiempoNeto / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoNeto % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoNeto % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoNeto % (1000 * 60)) / 1000);
    let tiempoFormateado = '';
    if (dias > 0) tiempoFormateado += dias + " días ";
    if (horas > 0) tiempoFormateado += horas + " horas ";
    if (minutos > 0) tiempoFormateado += minutos + " minutos ";
    if (segundos > 0) tiempoFormateado += segundos + " segundos ";
    return tiempoFormateado;
  };
  

  return (
    <div
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
    style={{
      backgroundSize: "cover",
      minHeight: "10vh",
      marginTop: "10px", // Adjust this value to create space
    }}
    ></div>
    <TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '130%', margin: '0', padding: 40, marginLeft: "-240px"}}>
        <br />
        
    <h2 style={{ textAlign: "center", color: "#9D1D7D", fontFamily:"Audiowide" }}>Listado de Reparaciones por Marca</h2>
        <br /> <br />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Fecha Hora Ingreso
              </TableCell>
              <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Tipo Reparacion
              </TableCell>
              <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Monto Total
              </TableCell>
              <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Fecha Hora Salida
              </TableCell>
              <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Fecha Hora Retiro
              </TableCell>
              <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Id Vehiculo
              </TableCell>
              <TableCell align="right" style={{ borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
              Tiempo Neto
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reparaciones.map((reparacion) => (
              <TableRow
                key={reparacion.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.fechaHoraIngreso}</TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.tipoReparacion}</TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.montoTotal}</TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.fechaHoraSalida}</TableCell>
                <TableCell align="right"style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.fechaHoraRetiro}</TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>
                  {reparacion.fechaHoraSalida && reparacion.fechaHoraIngreso ?
                    formatTiempoNeto(new Date(reparacion.fechaHoraSalida) - new Date(reparacion.fechaHoraIngreso)) 
                    : null
                  }
                </TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.idVehiculo}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right" colSpan={6} sx={{ fontWeight: "bold" }}>
                Tiempo Promedio:
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatTiempoNeto(calcularTiempoPromedio(reparaciones))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/vehiculo/list")}
          style={{ backgroundColor: "#DC0B90", color: "black", marginLeft: "0.5rem", fontFamily: "Quantico"  }}
        >
          Lista de Vehiculos
        </Button>
      </TableContainer>
    </div>
  );
};

export default ReparacionList;