import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { validateToken } from "../js/auth";
import { AgregarIngreso } from "../components/AgregarIngreso";
import { AgregarGasto } from "../components/AgregarGasto";


export const Budget = () => {
    const [showIngreso, setShowIngreso] = useState(false);
    const [showGasto, setShowGasto] = useState(false);
    const navigate = useNavigate();
    const handleSave = (data) => {
        console.log("Datos guardados:", data);
    };
    {/* Valida el token*/ }
    useEffect(() => {
        const check = async () => {

            const valid = await validateToken();

            if (!valid) {
                navigate("/login");
            }
        };

        check();
    }, []);

    {/* Jala el usuario y datos*/ }
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container text-center mt-5">
            <h1>Estamos felices de verte, {user.name}.</h1>
            <p>Crea tu presupuesto familiar aquí.</p>
            <h2>Gestor de Finanzas</h2>

            <button className="btn btn-success m-2" onClick={() => setShowIngreso(true)}>
                Agregar Ingreso
            </button>

            <button className="btn btn-danger m-2" onClick={() => setShowGasto(true)}>
                Agregar Gasto
            </button>

            <AgregarIngreso
                show={showIngreso}
                handleClose={() => setShowIngreso(false)}
                onSave={handleSave}
            />

            <AgregarGasto
                show={showGasto}
                handleClose={() => setShowGasto(false)}
                onSave={handleSave}
            />
        </div>
    );
}