import React from "react";
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Grid,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../Login/Login";

export default function Exercise({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const [exerciseData, setExerciseData] = useState([]);
  //On load, get exerciseData from the link...
  useEffect(() => {
    if (user.id != null) {
      axios
        .get(`http://localhost:3001/topics/exercise/${user.id}`)
        .then((response) => {
          setExerciseData(response.data.exerciseData);
        })
        .catch((e) => {
          console.log("id is empty");
        });
    }
  }, [user.id]);

  const renderExerciseCards = () => {
    if (exerciseData.length > 0) {
      return (
        <Grid container spacing={4}>
          {exerciseData.map((exercise, idx) => (
            <ExerciseCard
              key={idx}
              exerciseName={exercise.name}
              exerciseCategory={exercise.category}
              duration={exercise.duration}
              intensity={exercise.intensity}
              created_at={exercise.created_at}
            />
          ))}
        </Grid>
      );
    } else {
      return (
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
      );
    }
  };

  if (isLoggedIn) {
    return (
      <div>
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
          {renderExerciseCards()}
        </Container>
      </div>
    );
  } else {
    return (
      <Login user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
    );
  }
}

export function AddExercise({ user }) {
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
    //Post the exercise info to the correct user id... Each user should have their own exercise info.
    let params = {
      exerciseInfo: exerciseInfo,
      userId: user.id,
    };

    axios
      .post("http://localhost:3001/topics/exercise", params)
      .then((response) => {
        console.log("Successfully posted into the database!");
        navigate("/exercise");
      });
  };

  return (
    <div>
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

export function ExerciseCard({
  exerciseName,
  duration,
  intensity,
  exerciseCategory,
  created_at,
}) {
  return (
    <Grid item lg={4}>
      <Card
        sx={{
          boxShadow: 3,
          backgroundColor: "#FFCC00",
          color: "black",
          borderRadius: "15px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" sx={{ mb: 3 }}>
            {exerciseName}
          </Typography>
          <Grid container sx={{ mb: 5 }}>
            <Grid item xs={6}>
              <Typography variant="h5" color="black">
                Duration
              </Typography>
              <Typography variant="h5" color="black">
                {duration}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="black">
                Intensity
              </Typography>
              <Typography variant="h5" color="black">
                {intensity}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="body2">Created {created_at}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">{exerciseCategory}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
