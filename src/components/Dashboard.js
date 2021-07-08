import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import Header from "./Header";
import Loading from "./Loading";
import Movements from "./Movements";

const Dashboard = () => {
	const history = useHistory();
	const { user, setUser } = useContext(AppContext);
	const [seeMoves, setSeeMoves] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUserInfo = () => {
			setLoading(true);
			let token = localStorage.getItem("finerio-token");
			//Consulta endpoint para obtener info del usario
			if (token) {
				fetch("https://api.finerio.mx/api/me", {
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
						//Se actualiza el estado del context
						if (data.id) {
							setUser({ id: data.id, name: data.name, mail: data.email });
							setLoading(false);
						}
					})
					.catch((e) =>
						console.error("Error al obtener información del usuario.")
					);
			} else {
				history.push("/");
			}
		};
		getUserInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full min-h-screen bg-white ">
			{loading ? (
				<div className="sm:w-11/12 max-w-screen-lg m-auto p-4 text-center">
					<Loading />
				</div>
			) : (
				<>
					<Header name={user.name} />
					<div className="sm:w-11/12 max-w-screen-lg m-auto p-4">
						<p>
							Correo electrónico: <span className="font-bold">{user.mail}</span>
						</p>
						{seeMoves ? (
							<Movements />
						) : (
							<button
								className="mt-4 w-full md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button"
								onClick={() => setSeeMoves(true)}
							>
								Ver movimientos
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;
