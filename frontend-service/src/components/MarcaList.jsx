import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import marcaService from "../services/marca.service";
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

const MarcaList = () => {
  const [marca, setMarcas] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    marcaService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas los marcas.", response.data);
        setMarcas(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los marcas.",
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
      "¿Esta seguro que desea borrar este marca?"
    );
    if (confirmDelete) {
      marcaService
        .remove(id)
        .then((response) => {
          console.log("marca ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al marca",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/marca/edit/${id}`);
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
    <h2 style={{ textAlign: "center", color: "#9D1D7D", fontFamily:"Audiowide" }}>Listado de Marcas</h2>
    <Link
        to="/marca/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
    >
      <Button
        variant="contained"
        style={{ backgroundColor: "#9D1D7D", color: "white", marginLeft: '-850px',fontFamily: "Quantico"  }}
        size="small"
        startIcon={<PersonAddIcon />}
    >
        Añadir Marca
    </Button>
    </Link>
    <br /> <br />
    <Table sx={{ minWidth: 650, marginLeft: "-20px" }} size="small" aria-label="a dense table">
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Nombre de la Marca
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Fecha del Bono
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Descuento
    </TableCell>
    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontWeight: "bold", fontSize: "1.1rem", color: "#9D1D7D", fontFamily: "Audiowide" }}>
      Cantidad de Bonos
    </TableCell>
    <TableCell style={{ borderBottom: "1px solid #CAB0F3" }}></TableCell>



        <TableBody>
            {marca.map((marca) => (
                <TableRow
                key={marca.id}
                sx={{ 
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: marca.id % 2 === 0 ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
                    borderBottom: "1px solid #CAB0F3"
                }}
                >
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3", fontFamily: "Quantico" }}>{marca.nombre}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{marca.fechaBono}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{marca.descuento}</TableCell>
                    <TableCell align="right" style={{ borderRight: "2px solid #CAB0F3", borderBottom: "1px solid #CAB0F3",fontFamily: "Quantico"  }}>{marca.cantidadBonos}</TableCell>
                    <TableCell style={{borderBottom: "1px solid #CAB0F3" }}>

                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#1B0243", color: "white", marginLeft: "0.5rem", fontFamily: "Quantico"  }}
                            size="small"
                            onClick={() => handleEdit(marca.id)}
                            startIcon={<EditIcon />}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#A30469", color: "white", marginLeft: "0.5rem", fontFamily: "Quantico"  }}
                            size="small"
                            onClick={() => handleDelete(marca.id)}
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

export default MarcaList;
