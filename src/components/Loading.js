import React from "react";

const Loading = () => {
	return (
		<>
			<span className="relative flex h-9 w-9 m-auto">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
				<span className="relative inline-flex rounded-full h-9 w-9 bg-primary"></span>
			</span>
			<h1 className="font-bold text-indigo-800 text-xl mt-4">CARGANDO</h1>
		</>
	);
};

export default Loading;
