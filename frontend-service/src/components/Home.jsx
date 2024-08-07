import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WebFont from 'webfontloader';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DC0B90', // pink
    },
    secondary: {
      main: '#6effff', // softer cyan
    },
    background: {
      paper: 'rgba(24, 255, 255, 0.2)', // transparent cyan for the card
    },
    text: {
      primary: '#ffffff', // white text for better readability on the dark background
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Retro-futuristic font
  },
  overrides: {
    MuiTableContainer: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        width: '300%',
        margin: 0,
        padding: 40,
        marginLeft: '-580px',
      },
    },
  },
});

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Fredoka One', 'Audiowide', 'Quantico'], // Add more font families if needed
      },
    });
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <HeroSection style={{ flex: 1 }} />

        <FeaturesSection />

        <H1 />
        <H2 />
        <H3 />

      </div>
    </ThemeProvider>
  );
}

export default App;
