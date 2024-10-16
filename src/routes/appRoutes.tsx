import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Consulta from "../pages/Consulta/Consulta";
import VisualizacaoProjeto from "../pages/VisualizacaoProjeto/VisualizacaoProjeto";
import CadastroProjeto from "../pages/CadastroProjeto/CadastroProjeto";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import NotificacaoToast from "../components/NotificacaoToast/NotificacaoToast";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export default function AppRoutes() {
  return (
    <>
    <Router>
      <ScrollToTop />
      <NotificacaoToast />
        <Routes>
          <Route path="/" element={<Consulta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projeto/:id" element={<VisualizacaoProjeto />} />
          <Route path="/cadastro-projeto" element={<PrivateRoute element={<CadastroProjeto />} />} />
          <Route path="/edicao-projeto/:id" element={<PrivateRoute element={<CadastroProjeto />} />} />
        </Routes>
    </Router>
    <Footer />
    </>
  );
}