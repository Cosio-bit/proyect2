import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(135deg, #DC0B90, #1B0243)",
  },
  content: {
    flexGrow: 1,
  },
  vaporwaveText: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    letterSpacing: "3px",
    fontWeight: 600,
    color: "#2B044A",
    textShadow: "2px 2px 4px #FF00FF",
  },
  appBar: {
    background: "linear-gradient(135deg, #DC0B90, #1B0243)",
    marginBottom: "1px", // Adjust margin below AppBar
    height: "62.5px", // 25% increase in height
  },
  menuButton: {
    color: "#2B044A",
  },
  boxWrapper: {
    marginTop: "1px", // Adjust margin above Box wrapper
  },
}));

function Navbar({ logo }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
 

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const navLinks = [
    { path: "/", text: "Inicio" },
    { path: "/vehiculo/list", text: "Lista de Vehiculos" },
    { path: "/reparacion/list", text: "Lista de Reparaciones" },
    { path: "/marca/list", text: "Lista de Marcas" },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} className={classes.boxWrapper}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleToggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={logo} alt="logo" style={{ width: 150, height: 62.5, marginRight: 16 }} /> 
          </Link>
          
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleToggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {navLinks.map((link, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={link.path}
              onClick={handleToggleDrawer}
            >
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
export default Navbar;