import React from "react";
import { useHistory } from "react-router-dom";

const Header = ({ name }) => {
	const history = useHistory();
	//Se elimina token en localstorage
	const cerrarSesion = () => {
		localStorage.removeItem("finerio-token");
		history.push("/");
	};

	return (
		<div className="w-full bg-primary text-white">
			<div className="sm:w-11/12 max-w-screen-lg m-auto p-4 flex justify-between">
				<h1 className="font-bold text-2xl">Hola {name}</h1>
				<button
					className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
					onClick={cerrarSesion}
				>
					Salir
				</button>
			</div>
		</div>
	);
};

export default Header;
