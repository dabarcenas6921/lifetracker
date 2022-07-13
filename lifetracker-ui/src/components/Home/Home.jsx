import React from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";

export default function Home({ user }) {
  return (
    <div className="home">
      <Navbar user={user} />
      <Hero />
    </div>
  );
}
