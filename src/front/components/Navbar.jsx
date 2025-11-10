import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar">
			<div className="container">
				<div className="">Icono de la app</div>
				<div className="">
					<h4>Billetera Familiar</h4>
				</div>
				<div className="">
					<button className="btn btn-navbar">Cerrar Sesión</button>
					{/* Agregar un icono al boton */}
				</div>
			</div>
		</nav>
	);
};