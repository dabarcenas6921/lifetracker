import React from "react";
import Navbar from "../Navbar/Navbar";
import { Container, Typography } from "@mui/material";

export default function Sleep() {
  return (
    <div>
      <Container maxWidth="xl" sx={{ mt: "10px" }}>
        <Typography
          variant="h3"
          align="left"
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
      </Container>
    </div>
  );
}
