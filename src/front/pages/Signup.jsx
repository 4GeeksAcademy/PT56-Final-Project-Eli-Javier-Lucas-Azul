import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {

	const navigate = useNavigate();

	return (
		<div className="container mt-5 d-flex flex-column">
			<div>
				<form className="card p-5 d-flex">
					<div className="text-center">
						<h1 className="text-white pb-3">Registrate</h1>
					</div>
					<div className="mb-3">
						<input type="text" className="form-control" placeholder="Nombre" />
					</div>
					<div className="mb-3">
						<input type="email" className="form-control" placeholder="Email" />
					</div>
					<div className="mb-3">
						<input type="password" className="form-control" placeholder="Contraseña" />
					</div>
					<div className="d-flex justify-content-center gap-2">
						<button type="submit" className="btn btn-registro w-100">Registrarse</button>
						<Link to="/login" className="btn btn-iniciar_sesion w-100">
							Iniciar sesión
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}; 