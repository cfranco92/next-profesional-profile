"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SimpleThemeRegistry from "./SimpleThemeRegistry";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getWindow = (): Window | undefined => {
    return typeof window !== "undefined" ? window : undefined;
  };

  const muiOptions = {
    // Add options here if needed
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Cristian Franco
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} component={Link} href={item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getContainer = () => {
    const win = getWindow();
    return win ? () => win.document.body : undefined;
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SimpleThemeRegistry
          window={() => getWindow() as Window}
          muiOptions={muiOptions}
        >
          <AppBar component="nav">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
              >
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Cristian Franco
                </Link>
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.name} 
                    sx={{ color: "#fff" }}
                    component={Link}
                    href={item.path}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={getContainer()}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              anchor="left"
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>

          <Box
            component="main"
            sx={{
              p: 3,
              minHeight: "100vh",
              pt: { xs: 8, sm: 9 },
            }}
          >
            {children}
          </Box>
        </SimpleThemeRegistry>
      </body>
    </html>
  );
}
