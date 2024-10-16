import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement;
}

// Este componente verifica se o usuário está autenticado
export default function PrivateRoute({ element }: PrivateRouteProps) {
  // Substitua essa lógica por sua lógica de autenticação real
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Exemplo de token no localStorage
  };

  // Se o usuário estiver autenticado, renderiza o elemento da rota
  // Caso contrário, redireciona para a página de login
  return isAuthenticated() ? element : <Navigate to="/login" />;
}
