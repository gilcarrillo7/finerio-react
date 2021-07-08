import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = (props) => {
	//Estado de la app disponible en todos los componentes
	const [user, setUser] = useState({
		id: "",
		name: "",
		email: "",
	});

	return (
		<AppContext.Provider value={{ user, setUser }}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;