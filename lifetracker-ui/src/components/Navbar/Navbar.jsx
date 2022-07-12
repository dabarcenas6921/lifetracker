import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
  Link,
  Container,
} from "@mui/material";
import RunCircleIcon from "@mui/icons-material/RunCircle";

function Navbar() {
  return (
    <Container maxWidth="xl" sx={{ borderBottom: "solid #E2E8F0 2px" }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <RunCircleIcon sx={{ display: { xs: "block", sm: "block" } }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
          >
            <Link href="/" underline="none" color="inherit">
              LifeTracker
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">Activity</Button>
            <Button color="inherit">Exercise</Button>
            <Button color="inherit">Nutrition</Button>
            <Button color="inherit">Sleep</Button>
            <Button href="/login" color="secondary" variant="contained">
              Login
            </Button>
            <Button href="/register" color="secondary" variant="contained">
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Navbar;
