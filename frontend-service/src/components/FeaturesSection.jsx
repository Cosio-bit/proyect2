
import { Container, Typography, Grid } from '@mui/material';
import CardMarcas from './CardMarcas';
import CardReparaciones from './CardReparaciones';
import CardVehiculos from './CardVehiculos';
import CardPrecios from './CardPrecios';

const FeaturesSection = () => {
  return (
    <Container>
      <Typography variant="h6" align="left" sx={{ my: 4 }}>
      </Typography>
      <Grid container spacing={3} justifyContent="center" direction="row" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 4 }}>
          <CardMarcas sx={{ p: 2, width: '100%', height: '100%', transform: 'scale(1.2)' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 4 }}>
          <CardReparaciones sx={{ p: 2, width: '100%', height: '100%', transform: 'scale(1.2)' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 4 }}>
          <CardVehiculos sx={{ p: 2, width: '100%', height: '100%', transform: 'scale(1.2)' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 4 }}>
          <CardPrecios sx={{ p: 2, width: '100%', height: '100%', transform: 'scale(1.2)' }} />
        </Grid>

      </Grid>
    </Container>
  );
}

export default FeaturesSection;
