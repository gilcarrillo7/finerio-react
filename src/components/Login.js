import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./Logo";

import validator from "validator";

const Login = () => {
	const history = useHistory();

	const [form, setForm] = useState({ mail: "", password: "" });
	const [errorMail, setErrorMail] = useState("");
	const [errorPwd, setErrorPwd] = useState("");
	const [errorLogin, setErrorLogin] = useState("");

	const handleChange = (e) => {
		e.preventDefault();
		
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleForm = async (e) => {
		e.preventDefault();

		let errors = 0;
		if (form.mail === "") {
			setErrorMail("Ingresa tu correo electrónico");
			errors++;
		} else if (!validator.isEmail(form.mail)) {
			setErrorMail("Ingresa un correo electrónico válido");
			errors++;
		}

		if (form.password === "") {
			setErrorPwd("Ingresa tu contraseña");
			errors++;
		}

		if (errors !== 0) return;

		//Consulta al endpoint de login
		fetch("https://api.finerio.mx/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: form.mail, password: form.password }),
		})
			.then((response) => {
				//Si no se regreso status OK/200 hubo un error al iniciar sesión
				if (!response.ok) throw new Error(response.status);
				return response.json();
			})
			.then((data) => {
				//Se almacena el Token en localStorage y se redirecciona a Dashboard
				localStorage.setItem("finerio-token", data.access_token);
				history.push("/dashboard");
			})
			.catch((e) => {
				//Manejo de error al iniciar sesión
				if (e.message === "401")
					setErrorLogin(
						"Tus datos son incorrectos, verifica que los hayas escrito bien."
					);
				else setErrorLogin("Error al iniciar sesión: " + e);
			});
	};

	return (
		<div className="w-full flex h-screen">
			<form className="m-auto w-5/6 md:w-1/2" onSubmit={(e) => handleForm(e)}>
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
					<Logo />
					<h1 className="text-center font-bold mt-10 mb-4 text-3xl">
						Iniciar Sesión
					</h1>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Correo electrónico
						</label>
						<input
							className={`shadow appearance-none border ${
								errorMail ? "border-red-500" : ""
							} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="username"
							type="mail"
							placeholder="contacto@finerio.mx"
							name="mail"
							onChange={(e) => {
								setErrorMail("");
								setErrorLogin("");
								handleChange(e);
							}}
						/>
					</div>
					<div className="">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Contraseña
						</label>
						<input
							className={`shadow appearance-none border ${
								errorPwd ? "border-red-500" : ""
							}  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
							id="password"
							type="password"
							placeholder="Contraseña"
							name="password"
							autoComplete="on"
							onChange={(e) => {
								setErrorPwd("");
								setErrorLogin("");
								handleChange(e);
							}}
						/>
					</div>
					<div className="">
						<p className="text-red-500 text-xs italic">{errorMail}</p>
						<p className="text-red-500 text-xs italic">{errorPwd}</p>
						<p className="text-red-500 text-xs italic">{errorLogin}</p>
					</div>
					<div className="flex items-center justify-center mt-6">
						<button
							className="w-5/6 md:w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Entrar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
