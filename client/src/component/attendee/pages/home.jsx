import React, { useEffect } from "react";
import Navbar from "../jsx/navbar";
import Carousel from "../jsx/carousel";
import CardList from "../jsx/card";
import Footer from "../jsx/footer";
import { useNavigate } from "react-router-dom";
// import Navbar from '../jsx/nav'

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <>
      <Navbar />
      <Carousel />
      <CardList />
      <Footer />
    </>
  );
};

export default HomePage;
