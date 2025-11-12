import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    return (
        <div className="container mt-5 d-flex flex-column">
            <div className="text-center">
                <h1>Iniciar Sesion</h1>
            </div>
            <div>
                <form className="card p-3">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn-registro btn btn-primary">Iniciar sesion</button>
                </form>
            </div>
            <div>
                ¿No estás registrado?{" "}
                <Link to="/" className="link-text fw-semibold">
                    Registrate
                </Link>
            </div>
        </div>
    )
}