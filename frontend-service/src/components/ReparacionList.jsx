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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import WebFont from "webfontloader";

const ReparacionList = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { idVehiculo, marca } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'] // Add more font families if needed
      }
    });
    init(marca); // Pasamos el parámetro marca cuando está presente
  }, [idVehiculo, marca]); // Dependencias del efecto

  
  const init = () => {
    //si es numero entonces es idVehiculo, si no es marca
    
    if (idVehiculo) {
      console.log("Printing idVehiculo", idVehiculo);
      reparacionService
        .getFromVehiculo(idVehiculo)
        .then((response) => {
          console.log("Printing idVehiculo", idVehiculo);
          console.log("Mostrando listado de todas las reparaciones de un vehiculo.", response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            "Se ha producido un error al intentar mostrar listado de todas las reparaciones de un vehiculo.",
            error
          );
        });
    } else if (marca) {
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
  

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Está seguro que desea borrar esta reparación?"
    );
    if (confirmDelete) {
      reparacionService
        .remove(id)
        .then((response) => {
          console.log("Reparación ha sido eliminada.", response.data);
          init(marca); // Aquí deberías pasar 'marca' como argumento
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar la reparación",
            error
          );
        });
    }
  };
  
  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/reparacion/edit/${id}`);
  };

  const buttonStyle = {
    backgroundColor: "#DC0B90",
    color: "black",
    fontFamily: "Quantico"
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
<TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '133%', margin: '0', padding: 40, marginLeft: "-240px"}}>
        <br />
    <h2 style={{ textAlign: "center", color: "#9D1D7D", fontFamily:"Audiowide" }}>Listado de Reparaciones</h2>
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
              MontoTotal
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
              Acciones
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
                
                <TableCell align="right" style={{  borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>
                <div style={{ display: 'flex', gap: '0.5rem',  }}>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(reparacion.id)}
                      style={buttonStyle}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(reparacion.id)}
                      style={buttonStyle}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/vehiculo/list")}
          style={{ backgroundColor: "#9D1D7D", color: "white", marginLeft: '-850px',fontFamily: "Quantico"  }}
        >
          Lista de Vehiculos
        </Button>
      </TableContainer>
    </div>

  );
};

export default ReparacionList;
