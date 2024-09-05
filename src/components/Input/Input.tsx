import "../../global.scss";
import "./Input.scss";

interface InputProps {
    texto: string;
    placeholder: string;
}

function Input({ texto, placeholder }: InputProps) {
    return (
        <div className="input_container">
            <p>{texto}</p>
            <input type="text" placeholder={placeholder}></input>
        </div>
    );
}

export default Input;
