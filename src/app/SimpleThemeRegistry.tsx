"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useEffect, useState } from 'react';

// Props interface para SimpleThemeRegistry
interface SimpleThemeRegistryProps {
  children: ReactNode;
  // Props opcionales que se pasarán a MUI
  window?: () => Window;
  muiOptions?: Record<string, unknown>;
}

// Crear temas estáticos para evitar problemas de serialización
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#171717',
    },
    secondary: {
      main: '#6366f1',
    },
    background: {
      default: '#ffffff',
      paper: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ededed',
    },
    secondary: {
      main: '#818cf8',
    },
    background: {
      default: '#0a0a0a',
      paper: '#171717',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
  },
});

export default function SimpleThemeRegistry({ 
  children, 
  window,
  muiOptions = {}
}: SimpleThemeRegistryProps) {
  // Cliente está disponible solo después del montaje
  const [isClient, setIsClient] = useState(false);
  
  // Asegurarnos de que solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Props para pasar a MUI ThemeProvider y CssBaseline
  const muiProps = {
    window,
    ...muiOptions
  };

  // Si no estamos en el cliente, renderizamos una versión simplificada
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline enableColorScheme {...muiProps} />
        <div className="light-theme dark:hidden">
          {children}
        </div>
      </ThemeProvider>
      
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme {...muiProps} />
        <div className="hidden dark:block">
          {children}
        </div>
      </ThemeProvider>
    </>
  );
} 