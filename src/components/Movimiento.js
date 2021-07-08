import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const Movimiento = ({ mov }) => {
	const history = useHistory();
	const { customDescription, dateCreated, amount, category } = mov;
	const [categoria, setCategoria] = useState({ name: "", color: "" });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getUserInfo = () => {
			let token = localStorage.getItem("finerio-token");
			if (token && category.id) {
				//Se consulta endpoint de categorias para obtener color y nombre de la categoria
				fetch(`https://api.finerio.mx/api/categories/${category.id}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((response) => {
						if (!response.ok) throw new Error(response.status);
						return response.json();
					})
					.then((data) => {
						setCategoria({ name: data.name, color: data.color });
						setLoading(false);
					})
					.catch((e) =>
						console.error("Error al obtener información de los movimientos.")
					);
			} else {
				history.push("/login");
			}
		};
		getUserInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formatDate = (fecha) => {
		let d = new Date(fecha);

		const months = [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		];

		return `${d.getDate()} ${months[d.getMonth()]}`;
	};

	return (
		<li className="flex border-2 border-indigo-800 m-2 p-2">
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="w-1/2 sm:flex">
						<div className="sm:w-1/3">{formatDate(dateCreated)}</div>
						<div className="sm:w-2/3">{customDescription}</div>
					</div>
					<div className="w-1/2 sm:flex">
						<div
							className="sm:w-2/3 text-center"
							style={{ backgroundColor: categoria.color }}
						>
							{categoria.name}
						</div>
						<div className="sm:w-1/3 text-center">$ {amount}</div>
					</div>
				</>
			)}
		</li>
	);
};

export default Movimiento;
