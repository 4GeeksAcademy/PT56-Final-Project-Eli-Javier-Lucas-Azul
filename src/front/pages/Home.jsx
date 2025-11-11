import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	return (
		<div className="container mt-5 d-flex flex-column">
			<div className="text-center">
				<h1>Registrate</h1>
			</div>
			<div>
				<form className="card p-3">
					<div className="mb-3">
						<label for="name" className="form-label">Nombre</label>
						<input type="text" className="form-control" id="name" aria-describedby="name" />
					</div>
					<div className="mb-3">
						<label for="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="email" />
					</div>
					<div className="mb-3">
						<label for="password" className="form-label">Contraseña</label>
						<input type="password" className="form-control" id="password" />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
			<div>
				<p>¿Ya tienes una cuenta? Ingresa aquí</p>
			</div>
		</div>
	);
}; 