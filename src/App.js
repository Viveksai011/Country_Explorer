import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Page/Home";
import CountryDetails from "./Page/CountryDetails";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
