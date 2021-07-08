import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { AppContext } from "../context/AppContext";
import Loading from "./Loading";
import Movimiento from "./Movimiento";

const Movements = () => {
	const history = useHistory();
	const { user } = useContext(AppContext);
	const [movimientos, setMovimientos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(0);
	const token = localStorage.getItem("finerio-token");
	const max = 10;

	const fetchMoreData = () => {
		//Se actualizan los movimientos con un offset y un maximo
		fetch(
			`https://api.finerio.mx/api/users/${user.id}/movements?offset=${offset}&max=${max}&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				return response.json();
			})
			.then((data) => {
				if (data.size > 0) {
					setMovimientos(movimientos.concat(data.data));
					setOffset(offset + max);
				} else {
					setHasMore(false);
				}
				return;
			})
			.catch((e) =>
				console.error("Error al obtener información de los movimientos.")
			);
	};

	useEffect(() => {
		const getUserInfo = () => {
			setLoading(true);
			if (token && user.id) {
				//Se consulta endopoint para obtener movimientos con el id del usuario 
				fetch(
					`https://api.finerio.mx/api/users/${user.id}/movements?offset=0&max=${max}&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
					.then((response) => {
						if (!response.ok) throw new Error(response.status);
						return response.json();
					})
					.then((data) => {
						setMovimientos(data.data);
						setOffset(offset + max);
						setLoading(false);
						return;
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

	return (
		<>
			{loading ? (
				<div className="sm:w-11/12 max-w-screen-lg m-auto p-4 text-center">
					<Loading />
				</div>
			) : (
				<>
					{movimientos.length > 0 ? (
						<ul>
							<li className="border-2 border-indigo-800 m-2 p-2 mb-0 font-bold flex">
								<div className="w-1/2 sm:flex">
									<div className="sm:w-1/3">Fecha</div>
									<div className="sm:w-2/3">Descripción</div>
								</div>
								<div className="w-1/2 sm:flex">
									<div className="sm:w-2/3 text-center">Categoría</div>
									<div className="sm:w-1/3 text-center">Monto</div>
								</div>
							</li>
							<InfiniteScroll
								dataLength={movimientos.length}
								next={fetchMoreData}
								hasMore={hasMore}
								loader={<p className="text-center font-bold">Cargando...</p>}
							>
								{movimientos.map((mov) => (
									<Movimiento key={mov.id} mov={mov} />
								))}
							</InfiniteScroll>
						</ul>
					) : (
						<p className="font-bold text-2xl">No hay movimientos</p>
					)}
				</>
			)}
		</>
	);
};

export default Movements;
