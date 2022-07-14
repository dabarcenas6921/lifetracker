import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Exercise() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: "10px" }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: "black",
            top: 100,
            fontWeight: "bold",
            mb: 5,
            mt: 5,
          }}
        >
          Exercise
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "solid #E2E8F0 2px" }}
        >
          <Typography
            variant="h4"
            align="left"
            sx={{
              color: "black",
              top: 100,
              fontWeight: "bold",
              mb: 5,
              mt: 5,
            }}
          >
            Overview
          </Typography>
          <Button color="secondary" variant="contained" href="/addExercise">
            Add Exercise
          </Button>
        </Stack>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "black",
            top: 100,
            fontWeight: "bold",
            mb: 5,
            mt: 5,
          }}
        >
          Nothing to show!
        </Typography>
      </Container>
    </div>
  );
}

export function AddExercise() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Printing out the data retreived from the signup sheet
    const exerciseName = data.get("exerciseName");
    const exerciseCategory = data.get("exerciseCategory");
    const duration = data.get("duration");
    const intensity = data.get("intensity");
    const exerciseInfo = {
      exerciseName: exerciseName,
      exerciseCategory: exerciseCategory,
      duration: duration,
      intensity: intensity,
    };
    console.log(exerciseInfo);

    axios
      .post("http://localhost:3001/addTopic/exercise", exerciseInfo)
      .then((response) => {
        console.log("Successfully posted into the database!");
        navigate("/exercise");
      });
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl" disableGutters={true}>
          <CssBaseline />
          <Typography
            variant="h3"
            align="center"
            sx={{
              color: "black",
              top: 100,
              fontWeight: "bold",
              mb: 5,
              mt: 5,
            }}
          >
            Exercise
          </Typography>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Add Exercise
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="exerciseName"
                    required
                    fullWidth
                    id="exerciseName"
                    label="Exercise name"
                    variant="outlined"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="exerciseCategory"
                    label="Exercise Category"
                    name="exerciseCategory"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="duration"
                    label="Duration (min)"
                    id="duration"
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="intensity"
                    label="Intensity (1-10)"
                    type={"number"}
                    id="intensity"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Exercise
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
