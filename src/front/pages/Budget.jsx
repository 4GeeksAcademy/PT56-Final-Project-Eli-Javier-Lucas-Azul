import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";

export const Budget = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {

            const valid = await validateToken();

            if (!valid) {
                navigate("/login");
            }
        };

        check();
    }, []);

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container mt-5 d-flex flex-column">
            {user ? (
                <div>
                    <h3>Estamos felices de verte, {user.name}.</h3>
                    <p>Crea tu presupuesto familiar aquí.</p>
                </div>
            ) : (
                <h3>¡Disculpa crack, te faltó logearte!</h3>
            )}
        </div>
    )
}