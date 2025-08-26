"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AlertDialogDemo } from "@/components/AlertDialog";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";

export default function createUser() {
	const { toast } = useToast();

	const [data, setData] = useState([]);
	const [centers, setCenters] = useState([]);

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [rol, setRol] = useState("Dependiente");
	const [selectedCenter, setSelectedCenter] = useState(null);
	const [error, setError] = useState("");

	const [element, setElement] = useState({});

	const [elim, setElim] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/users")
				.then((res) => {
					setData(res.data.users);
					setCenters(res.data.centers);
				})
				.catch((err) => {
					alert(err.message);
				});
		};
		fetchData();
	}, [refresh]);

	const createUser = async () => {
		if (user === "" && password.length < 8) {
			setError("La información de usuario esta incompleta o incorrecta");
			return;
		}
		await axios
			.post("http://localhost:3000/api/users", {
				data: { user: user, password: password, rol, id_centro: selectedCenter },
			})
			.then((res) => {
				toast({ title: "Exito", description: res.data.message });
				setRefresh(!refresh);
				setUser("");
				setPassword("");
			})
			.catch((err) => {
				toast({ title: "Error", description: err.message });
			});
	};

	const handleDelete = (e, element) => {
		e.preventDefault();
		setElement(element);
		setElim(!elim);
	};

	const deleteUser = async (element) => {
		await axios
			.delete("http://localhost:3000/api/users", {
				data: {
					id: element.id,
				},
			})
			.then((res) => {
				toast({ title: "Exito", description: res.data.message });
				setRefresh(!refresh);
			})
			.catch((err) => {
				toast({ title: "Error", description: err.message });
			});
	};

	return (
		<div className="w-full max-lg:h-auto h-[100vh] bg-slate-100 text-black user-select-none">
			<AlertDialogDemo
				elim={elim}
				handleDelete={handleDelete}
				element={element}
				deleteProd={deleteUser}
			/>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 className="text-xl">Users Information</h1>
			</div>
			<div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
				<div
					className="h-[auto] py-2 w-[100%] user-select-none  gap-[2%] mt-5 
       bg-slate-100 shadow-md rounded-lg grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
				>
					{data.map((usuario) => (
						<div
							key={usuario.id}
							onContextMenu={(e) => handleDelete(e, usuario)}
							className="w-[100%] bg-white flex rounded-md shadow-md mx-1 place-items-center mt-2"
						>
							<Image
								src={"/avatar+.svg"}
								alt={usuario.nombre}
								width={70}
								height={40}
								className="rounded-full place-items-center"
							/>
							<div className="block w-[60%]">
								<p className="text-black ml-5">{usuario.nombre}</p>
								<p className="text-slate-500 ml-5 text-[12px] font-thin">
									{usuario.rol}
								</p>
								{usuario.id_centro && (
									<p className="text-slate-500 ml-5 text-[12px] font-thin">
										{
											centers.filter((p) => p.id === usuario.id_centro)[0]
												.nombre
										}
									</p>
								)}
							</div>
							<Button
								onClick={(e) => {
									handleDelete(e, usuario);
									e.stopPropagation();
								}}
								variant="error"
								className="bg-transparent h-auto w-auto"
							>
								<Trash className="stroke-red-700" size={32} />
							</Button>
						</div>
					))}
				</div>
			</div>
			<div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
				<form className="align-middle text-center items-center p-12  bg-white w-[100%]">
					<h1 className="text-xl font-semibold mb-4" id="create">
						Create New Users
					</h1>
					<div className=" flex flex-col">
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
						<p className="text-sm self-start mb-2 ml-2 text-slate-400">
							Seleccione el rol del usuario
						</p>
						<select
							name=""
							id=""
							onChange={(e) => setRol(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
						>
							<option value="Dependiente">Dependiente</option>
							<option value="Administrador">Administrador</option>
						</select>
						<select
							name=""
							id=""
							onChange={(e) => setSelectedCenter(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
						>
							<option value={null}>Seleccione un Centro</option>
							{centers.map((center) => (
								<option key={center.id} value={center.id}>
									{center.nombre}
								</option>
							))}
						</select>
					</div>
					{error && <p className="text-red-700 mb-2">{error}</p>}

					<Button type="button" onClick={createUser}>
						Agregar Usuario
					</Button>
				</form>
			</div>
		</div>
	);
}
