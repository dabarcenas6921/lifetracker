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
  Avatar,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nutrition({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [nutritonData, setNutritionData] = useState([]);

  //On load, get exerciseData from the link...
  useEffect(() => {
    axios
      .get(`http://localhost:3001/topics/nutrition/${user.id}`)
      .then((response) => {
        setNutritionData(response.data.nutritionData);
      })
      .catch((e) => {
        console.log("id is empty");
      });
  }, [user.id]);

  const renderFoodCards = () => {
    if (nutritonData.length > 0) {
      return (
        <Grid container spacing={4}>
          {nutritonData.map((nutrition, idx) => (
            <NutritionCard
              key={idx}
              nutritionName={nutrition.name}
              nutritionCategory={nutrition.category}
              calories={nutrition.calories}
              quantity={nutrition.quantity}
              imageUrl={nutrition.image_url}
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
  //Main Nutrition Page
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
          Nutrition
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
          <Button color="secondary" variant="contained" href="/addNutrition">
            Add Food
          </Button>
        </Stack>
        {renderFoodCards()}
      </Container>
    </div>
  );
}
//Add Nutrition Form
export function AddNutrition({ user }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Printing out the data retreived from the signup sheet
    const nutritionName = data.get("nutritionName");
    const nutritionCategory = data.get("nutritionCategory");
    const calories = data.get("calories");
    const quantity = data.get("quantity");
    const imageUrl = data.get("imageUrl");
    const nutritionInfo = {
      nutritionName: nutritionName,
      nutritionCategory: nutritionCategory,
      calories: calories,
      quantity: quantity,
      imageUrl: imageUrl,
    };
    console.log(nutritionInfo);
    //Post the exercise info to the correct user id... Each user should have their own exercise info.
    let params = {
      nutritionInfo: nutritionInfo,
      userId: user.id,
    };

    axios
      .post("http://localhost:3001/topics/nutrition", params)
      .then((response) => {
        console.log("Successfully posted into the database!");
        navigate("/nutrition");
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
            Nutrition
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
              Record Nutrition
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
                    name="nutritionName"
                    required
                    fullWidth
                    id="nutritionName"
                    label="Nutrition name"
                    variant="outlined"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nutritionCategory"
                    label="Nutrition Category"
                    name="nutritionCategory"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    id="quantity"
                    type={"number"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="calories"
                    label="Calories"
                    type={"number"}
                    id="calories"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="imageUrl"
                    label="Image URL"
                    id="imageUrl"
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
                Submit Nutrition
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export function NutritionCard({
  nutritionName,
  calories,
  quantity,
  nutritionCategory,
  imageUrl,
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
            <Grid item>
              <Avatar
                alt="Food image"
                src={imageUrl}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ mb: 3 }}
              >
                {nutritionName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 5 }}>
            <Grid item xs={8}>
              <Typography variant="h5" color="black">
                Calories Per Item
              </Typography>
              <Typography variant="h5" color="black">
                {calories}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="black">
                Quantity
              </Typography>
              <Typography variant="h5" color="black">
                {quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h5">
                Category: {nutritionCategory}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
