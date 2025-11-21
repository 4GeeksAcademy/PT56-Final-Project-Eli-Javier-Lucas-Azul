import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/img/Icon.jpeg"
import { useEffect } from "react";
import { validateToken } from "../js/auth";

export const Navbar = () => {

	const navigate = useNavigate();
	const token = localStorage.getItem("jwt");

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("user");
		navigate("/login");
	};

	useEffect(() => {
		const check = async () => {
			const valid = await validateToken();
			if (!valid) navigate("/login");
		};
		check();
	}, []);

	return (
		<nav className="navbar container-fluid d-flex justify-content-between align-items-center px-3">

			<div className="d-flex aling-items-center gap-3">
				<Link to="/Home">
					<img
						src={Icon}
						alt=""
						width={90}
						height={90}
						className="rounded-4 border border-success border-4"
					/>
				</Link>
			</div>
			<div className="">
				<h1>Billetera Familiar</h1>
			</div>

			{/* Botones */}

			<div className="d-flex align-items-center gap-2">

				{/* Si el token NO existe, muestra el login y el signup */}
				{!token && (
					<>
						<Link to={"/login"} className="btn nav-btns">Iniciar sesión</Link>
						<Link to={"/signup"} className="btn nav-btns">Registrate</Link>
					</>
				)}

				{/* Si el token SI existe, mostrar Cerrar sesion */}
				{token && (
					<button className="btn nav-btn_cerrar_sesion" onClick={handleLogout}>Cerrar sesión</button>
				)}

			</div>
		</nav>

	);
};