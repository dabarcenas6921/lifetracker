import React from "react";
import { Card, CardMedia, Typography, Button, Container } from "@mui/material";

export default function Hero() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Card sx={{ boxShadow: 0 }}>
        <div style={{ position: "relative" }}>
          <CardMedia
            sx={{
              maxHeight: "100%",
              width: "100%",
              position: "relative",
              left: 500,
            }}
            component="img"
            image="https://i.guim.co.uk/img/media/10690e25ff08f2d5b87e204e7fa71530c5468b60/73_0_1713_1028/master/1713.jpg?width=880&quality=45&fit=max&dpr=2&s=7893b57145fc217a8c0744e417f45872"
            title="launch image"
            alt="launch image"
          />
          <Typography
            variant="h2"
            align="center"
            sx={{
              position: "absolute",
              color: "black",
              top: 170,
              left: "22%",
              transform: "translateX(-50%)",
              fontWeight: "bold",
              fontSize: "5rem",
            }}
          >
            Welcome to <br />
            the new you
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{
              position: "absolute",
              color: "black",
              top: 380,
              left: "22%",
              transform: "translateX(-50%)",
            }}
          >
            LifeTracker: The <br /> world's best fitness app
          </Typography>
          <Button
            href="/register"
            color="secondary"
            variant="contained"
            sx={{
              position: "absolute",
              top: 505,
              left: "22%",
              transform: "translateX(-50%)",
              width: "200px",
              height: "70px",
              fontSize: "20px",
            }}
          >
            Sign Up Now
          </Button>
        </div>
      </Card>
    </Container>
  );
}
