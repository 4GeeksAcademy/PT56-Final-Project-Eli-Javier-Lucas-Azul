import React from "react";
import { useNavigate } from "react-router-dom";
import home_page from "../assets/img/home_9.jpg"


export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex">
            <div>
                <img
                    src={home_page}
                    alt="home"
                    className="home-img"
                />
            </div>

            <div className="home-text">
                <h1>¡Bienvenidos!</h1>
                <p>
                    Un gestor de gastos familiar es necesario  para tomar control de las finanzas, identificar a dónde va el dinero, evitar deudas, ahorrar para metas y prepararse para imprevistos. Permite tener una visión clara de los ingresos y gastos, lo que facilita la toma de decisiones financieras acertadas para lograr el bienestar económico de la familia.
                </p>
                <p>Para saber más, solo haz click en el botón de acá abajo.</p>
                <button
                    className="btn home-button"
                    onClick={() => navigate("/InfoGestor")}
                >
                    Leer más
                </button>
            </div>

        </div>
    );
};
