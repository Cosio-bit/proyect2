import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
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
  const { tipoVehiculo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'] // Add more font families if needed
      }
    });
    init(tipoVehiculo); // Pasamos el parámetro tipoVehiculo cuando está presente
  }, [tipoVehiculo]); // Dependencias del efecto
  
  const init = () => {
    //si es numero entonces es idVehiculo, si no es tipoVehiculo
      if (tipoVehiculo) {
      reparacionService
        .getByTipoVehiculo(tipoVehiculo)
        .then((response) => {
          console.log(`Mostrando listado de todas las reparaciones de la tipoVehiculo ${tipoVehiculo}.`, response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            `Se ha producido un error al intentar mostrar listado de todas las reparaciones de la tipoVehiculo ${tipoVehiculo}.`,
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

  const calcularMontoTotalAcomulado = (reparacionesData) => {
    let sumaMontos = 0;
    reparacionesData.forEach((reparacion) => {
      sumaMontos += reparacion.montoTotal;
    });
    return sumaMontos; // Retorna la suma de montos
  };

  return (
    <div
      style={{
        //backgroundImage: `url(${backgroundImageUrl})`,
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
        
        <h2 style={{ textAlign: "center", color: "#9D1D7D", fontFamily:"Audiowide" }}>Listado de Reparaciones por Tipo de Vehículo</h2>
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
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.fechaHoraRetiro}</TableCell>
                <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{reparacion.idVehiculo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right" colSpan={6} sx={{ fontWeight: "bold" }}>
                Monto Total Acumulado:
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {calcularMontoTotalAcomulado(reparaciones)}
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
