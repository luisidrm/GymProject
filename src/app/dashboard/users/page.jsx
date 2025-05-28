"use client";

import { useState } from "react";
import axios from "axios";

export default function createUser() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const createUser = async () => {
		try {
			const response = await axios.post("http://localhost:3000/api/users", {
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				},
				data: {
					user: user,
					password: password,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-[100vh] bg-slate-100 text-black user-select-none">
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 className="text-xl">Users Information</h1>
			</div>
			<div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
				<form className="align-middle text-center items-center p-12  bg-white w-[100%]">
					<div className=" md:flex md:flex-row flex flex-col">
						<input
							type="text"
							name="user"
							value={user}
							onChange={(e) => setUser(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
							placeholder="Nombre de usuario"
						/>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
              placeholder="Contraseña"
						/>
					</div>
					<button type="button" onClick={createUser}>
						Agregar
					</button>
				</form>
			</div>
		</div>
	);
}
