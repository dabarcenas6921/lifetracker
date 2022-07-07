import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import RunCircleIcon from "@mui/icons-material/RunCircle";

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <RunCircleIcon sx={{ display: { xs: "block", sm: "block" } }} />
        </IconButton>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          LifeTracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
