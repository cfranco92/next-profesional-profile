"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  // Detectar la preferencia del sistema
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  
  // Actualizar el modo si cambia la preferencia del sistema
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);
  
  // Crear el tema basado en el modo actual
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Paleta para modo claro
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
              }
            : {
                // Paleta para modo oscuro
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
              }),
        },
        typography: {
          fontFamily: 'var(--font-geist-sans)',
        },
        // Simplificar componentes para evitar conflictos con serialización de funciones
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                lineHeight: 'inherit',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
} 