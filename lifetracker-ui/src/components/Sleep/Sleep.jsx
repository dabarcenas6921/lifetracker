import React from "react";
import {
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  CssBaseline,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../Login/Login";

export default function Sleep({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const [sleepData, setSleepData] = useState([]);

  //On load, get exerciseData from the link...
  useEffect(() => {
    axios
      .get(`http://localhost:3001/topics/sleep/${user.id}`)
      .then((response) => {
        setSleepData(response.data.sleepData);
      })
      .catch((e) => {
        console.log("id is empty");
      });
  }, [user.id]);

  const renderSleepCards = () => {
    if (sleepData.length > 0) {
      return (
        <Grid container spacing={4}>
          {sleepData.map((sleep, idx) => {
            const d1 = new Date(sleep.startdate);
            const d2 = new Date(sleep.enddate);
            const totalHours = Math.abs(d2 - d1) / 3600000;
            return (
              <SleepCard
                key={idx}
                startDate={d1.toDateString()}
                startTime={d1.toLocaleString()}
                endTime={d2.toLocaleString()}
                totalHours={totalHours.toString()}
              />
            );
          })}
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
  //Main Sleep Page
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
            Sleep
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
            <Button color="secondary" variant="contained" href="/addSleep">
              Add Sleep
            </Button>
          </Stack>
          {renderSleepCards()}
        </Container>
      </div>
    );
  } else {
    return (
      <Login user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
    );
  }
}
//Add Sleep Form
export function AddSleep({ user }) {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("2022-01-01T12:00");
  const [endDate, setEndDate] = useState("2022-01-01T12:00");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(data.get("startDate"));
    // const startDate = new Date(data.get("startDate"));
    // const endDate = new Date(data.get("endDate"));
    // Printing out the data retreived from the signup sheet
    console.log("start Date is: ", startDate);
    console.log("endDate is: ", endDate);
    const sleepInfo = {
      startDate: startDate,
      endDate: endDate,
    };
    console.log(sleepInfo);
    //Post the exercise info to the correct user id... Each user should have their own exercise info.
    let params = {
      sleepInfo: sleepInfo,
      userId: user.id,
    };

    axios
      .post("http://localhost:3001/topics/sleep", params)
      .then((response) => {
        console.log("Successfully posted into the database!");
        navigate("/sleep");
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
            Sleep
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
              Record Sleep
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="startDate"
                    label="Start Date"
                    type="datetime-local"
                    defaultValue="2022-01-01T12:00"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="endDate"
                    label="End Date"
                    type="datetime-local"
                    defaultValue="2022-01-01T12:00"
                    onChange={(e) => setEndDate(e.target.value)}
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
                Submit Sleep
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export function SleepCard({
  startDate,
  startTime,
  endDate,
  endTime,
  totalHours,
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                align="center"
                sx={{ mb: 3 }}
              >
                {startDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 5 }}>
            <Grid item xs={4}>
              <Typography variant="h5" align="center" color="black">
                Start Time
              </Typography>
              <Typography variant="h6" align="center" color="black">
                {startTime}
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography variant="h5" align="center" color="black">
                End Time
              </Typography>
              <Typography variant="h6" align="center" color="black">
                {endTime}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Total Hours Slept: {totalHours}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
