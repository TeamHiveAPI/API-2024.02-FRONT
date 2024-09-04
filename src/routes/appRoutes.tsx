import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Consulta from "../pages/Consulta/Consulta";

export default function AppRoutes() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Consulta />} />
        </Routes>
    </Router>
  );
}