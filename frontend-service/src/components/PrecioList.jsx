import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WebFont from "webfontloader";

const PrecioList = () => {
  const [precio, setPrecios] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    reparacionService
      .getAllP()
      .then((response) => {
        console.log("Mostrando listado de todas los precios.", response.data);
        setPrecios(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los precios.",
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
      "¿Esta seguro que desea borrar este precio?"
    );
    if (confirmDelete) {
      reparacionService
        .removeP(id)
        .then((response) => {
          console.log("precio ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al precio",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/precio/edit/${id}`);
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

<TableContainer component={Paper} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', width: '300%', margin: '0', padding: 40, marginLeft: "-580px"}}>
    <br />
    <h2 style={{ textAlign: "center", color: "#9D1D7D", fontFamily:"Audiowide" }}>Listado de Precios</h2>
    <Link
        to="/precio/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
    >
      <Button
        variant="contained"
        style={{ backgroundColor: "#9D1D7D", color: "white", marginLeft: '-850px',fontFamily: "Quantico"  }}
        size="small"
        startIcon={<PersonAddIcon />}
    >
        Añadir Precio
    </Button>
    </Link>
    <br /> <br />
    <Table sx={{ minWidth: 650, marginLeft: "-20px" }} size="small" aria-label="a dense table">
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Nombre de Reparacion
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Precio de Diesel
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Precio de Gasolina
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Precio de Hibrido
    </TableCell>
    <TableCell align="right" style={{ borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Precio de Electrico
    </TableCell>
    <TableCell style={{ borderBottom: "1px solid #CAB0F3" }}></TableCell>



        <TableBody>
            {precio.map((precio) => (
                <TableRow
                key={precio.id}
                sx={{ 
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: precio.id % 2 === 0 ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
                    borderBottom: "1px solid #CAB0F3"
                }}
                >
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{precio.tipoPrecio}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{precio.precioDiesel}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{precio.precioGasolina}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{precio.precioHibrido}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{precio.precioElectrico}</TableCell>
                   
                    <TableCell style={{borderBottom: "1px solid #CAB0F3" }}>

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#1B0243", color: "white", marginLeft: "0.5rem", fontFamily: "Quantico"  }}
                            size="small"
                            onClick={() => handleEdit(precio.id)}
                            startIcon={<EditIcon />}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#A30469", color: "white", marginLeft: "0.5rem", fontFamily: "Quantico"  }}
                            size="small"
                            onClick={() => handleDelete(precio.id)}
                            startIcon={<DeleteIcon />}
                        >
                            Eliminar
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>

    </div>
  );
};

export default PrecioList;
