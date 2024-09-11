import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Consulta from "../pages/Consulta/Consulta";
import VisualizacaoProjeto from "../pages/VisualizacaoProjeto/VisualizacaoProjeto";
import CadastroProjeto from "../pages/CadastroProjeto/CadastroProjeto";
import Footer from "../components/Footer/Footer";

export default function AppRoutes() {
  return (
    <>
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/detalhes" element={<VisualizacaoProjeto />} />
        <Route path="/cadastro-projeto" element={<CadastroProjeto />} />
        </Routes>
    </Router>
    <Footer />
    </>
  );
}