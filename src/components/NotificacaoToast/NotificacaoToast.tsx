import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificacaoToast.scss";

function NotificacaoToast() {
  
  return (
    <ToastContainer 
    position="top-center"
    pauseOnHover={false}
    toastClassName="custom-toast"
    bodyClassName="custom-toast-text"
    />
  );
}


export default NotificacaoToast;