import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import AvatarImage from '@mui/material/Avatar';


const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function CardVehiculos() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        avatar={
          <AvatarImage
            src="src/components/Vehiculos.png"
            alt="Marcas"
            sx={{
              width: 250,
              height: 80,
              borderRadius: 0, // Set borderRadius to 0 for a square avatar
              objectFit: "scale-down", // Prevent image from overflowing its container
            }}
          />
        }
      
        
      />
      <CardMedia
        component="img"
        height="194"
        image="https://storage.googleapis.com/pod_public/1300/170895.jpg"
        alt="Marcas de vehículos"
      />
      <CardContent>
        <Button variant="contained" color="primary" href="/vehiculo/list">
          Lista de Vehiculos
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>Heat</Typography>
          <Typography paragraph>Heat</Typography>
          <Typography paragraph>Add</Typography>
          <Typography>Set</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


//"https://storage.googleapis.com/pod_public/1300/170895.jpg"