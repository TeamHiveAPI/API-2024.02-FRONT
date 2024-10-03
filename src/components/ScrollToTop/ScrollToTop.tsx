import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Força rolar para o topo sempre que a rota mudar
  }, [pathname]);

  return null;
}

export default ScrollToTop;