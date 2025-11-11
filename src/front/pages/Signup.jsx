import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from 'react-router-dom';


export const Signup = () => {
	// Almacenamos los datos ingresados 
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	// Actualiza el estado 
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	// Envia el formulario
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//Hacer el POST al backendzs
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			//Pasamos la respuesta a .json
			const data = await response.json();
			if (response.ok) {
				alert(data.Mensaje);
			} else {
				alert(data.Mensaje);
			}
		} catch (error) {
			alert("Error de conexión con el servidor");
		}
	}
	return (
		<div className="container mt-5 d-flex flex-column">
			<div className="text-center">
				<h1>Registrate</h1>
			</div>
			<div>
				<form className="card p-3" onSubmit={handleSubmit}>
					<div className="mb-3">
						<label for="name" className="form-label">Nombre</label>
						<input
							type="text"
							className="form-control"
							id="name"
							aria-describedby="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label for="email" className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label for="password" className="form-label">Contraseña</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="btn-registro btn btn-primary">Registrarse</button>
				</form>
			</div>
			<div>
				<p>¿Ya tienes una cuenta? <Link to="/login">Ingresa aquí</Link></p>
			</div>
		</div>
	);
}; 