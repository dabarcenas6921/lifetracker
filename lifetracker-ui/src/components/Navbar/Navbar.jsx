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
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

function Navbar({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ borderBottom: "solid #E2E8F0 2px" }}
      disableGutters={true}
    >
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
            <Link
              to="/"
              component={RouterLink}
              underline="none"
              color="inherit"
            >
              LifeTracker
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" to="/activity" component={RouterLink}>
              Activity
            </Button>
            <Button color="inherit" to="/exercise" component={RouterLink}>
              Exercise
            </Button>
            <Button color="inherit" to="/nutrition" component={RouterLink}>
              Nutrition
            </Button>
            <Button color="inherit" to="/sleep" component={RouterLink}>
              Sleep
            </Button>
            {isLoggedIn ? (
              <Button
                onClick={handleOnClick}
                color="secondary"
                variant="contained"
              >
                Logout
              </Button>
            ) : (
              <Button
                to="/login"
                color="secondary"
                variant="contained"
                component={RouterLink}
              >
                Login
              </Button>
            )}
            {isLoggedIn ? null : (
              <Button
                to="/register"
                component={RouterLink}
                color="secondary"
                variant="contained"
              >
                Register
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Navbar;
