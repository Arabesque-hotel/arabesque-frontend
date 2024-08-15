import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Gallery from "./pages/Gallery/Gallery";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Privacy from "./pages/legalStuff/PrivacyPolicy/Privacy";
import Terms from "./pages/legalStuff/TermsAndCond/Terms";
import "./global.scss";
import ThankYou from "./pages/ThankYou/ThankYou";
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {

  return (
    <div>
      <SpeedInsights/>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/thankYou" element={<ThankYou />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termsAndConditions" element={<Terms />} />
          </Routes>
        <Footer />
    </div>
  );
};

export default App;
