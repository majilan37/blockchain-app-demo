import { Close, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import { Styles } from "../types";

const styles: Styles = {
  logo: {
    cursor: "pointer",
  },
  headerLinks: {
    display: {
      xs: "none",
      sm: "flex",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    p: "5px 0",
  },
  button: {
    color: "white",
    m: "0 5px",
    p: "10px 15px",
  },
};

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" className="gradient-bg-welcome">
      <Container>
        <Toolbar sx={styles.toolbar}>
          <Typography sx={styles?.logo} variant="h6" color={"white"}>
            Logo
          </Typography>
          <Box sx={styles.headerLinks}>
            {["Market", "Exchanges", "Tutorials", "Wallet"].map(
              (item, index) => (
                <Button key={index} sx={styles.button}>
                  {item}
                </Button>
              )
            )}
            <Button
              sx={{
                borderRadius: "30px",
                p: "0 20px",
              }}
              variant="contained">
              Log in
            </Button>
          </Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpen((e) => !e)}
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              color: "white",
              position: "absolute",
              right: "0",
            }}
            color="inherit">
            {open ? <Close /> : <MenuIcon />}
          </IconButton>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}>
            <Menu
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ position: "absolute", top: "40px", right: "0" }}
              open={open}
              onClose={() => setOpen(false)}>
              {["Market", "Exchanges", "Tutorials", "Wallet"].map(
                (item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
