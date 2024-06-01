
import { Container, Typography} from '@mui/material';


const HeroSection = () => {

  return (
    <Container sx={{ py: 8 }}>
      <img src="src/components/Bienvenidos.png" alt="bienvenidos" style={{ width: '100%', height: 'auto' }} />
      <img src="src/components/SistemadeReparaciones.png" alt="sistema de reparaciones" style={{ width: '100%', height: 'auto' }} />
      <Typography variant="body1" align="center" sx={{ mb: 6, fontFamily: 'Quantico', color: '#0EF3F9', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)', fontSize: '1.5rem' }}>
        Puedes agregar autos, marcas y reparaciones a tu sistema.
      </Typography>
    </Container>
  );
}

export default HeroSection;
