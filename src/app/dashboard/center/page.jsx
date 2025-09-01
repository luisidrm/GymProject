"use client";

import { AlertDialogDemo } from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { CirclePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
	const [data, setData] = useState([]);
	const [error, setError] = useState("");

	const [refresh, setRefresh] = useState(false)
	const [elim, settElim] = useState(false);
	const [element, setElement] = useState({});

	const [centro, setCentro] = useState("");
	const [direccion, setDireccion] = useState("");
	const [horario, setHorario] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/centers")
				.then((res) => {
					setData(res.data.centers);
				})
				.catch((err) => {
					console.log(err.response.data.message);
				});
		};
		fetchData();
	}, [refresh]);

	const handleDelete = () => {
		settElim(!elim);
	};
	const createCenter = async () => {
		await axios.post("http://localhost:3000/api/centers",{
			centro,
			direccion,
			horario
		}).then((res)=>{
			toast({
				title:"Exito",
				description: res.data.message
			})
			setRefresh(!refresh)
		}).catch((err)=>{
			setError(err.response.data.message)
		})
	};

	const deleteCenter = async () => {};

	return (
		<div className="w-full max-lg:h-auto h-[100vh] bg-slate-100 text-black user-select-none">
			<AlertDialogDemo
				elim={elim}
				handleDelete={handleDelete}
				element={element}
				deleteProd={deleteCenter}
			/>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 className="text-xl">Centros</h1>
			</div>
			<div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
				<div
					className="h-[auto] py-2 w-[100%] user-select-none  gap-[2%] mt-5 
       bg-slate-100 shadow-md rounded-lg grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
				>
					{data.map((center) => (
						<div
							key={center.id}
							onContextMenu={(e) => handleDelete(e, center)}
							className="w-[100%] bg-white flex rounded-md shadow-md mx-1 place-items-center mt-2"
						>
							<Image
								src={"/center.png"}
								alt={center.nombre}
								width={70}
								height={40}
								className="rounded-full place-items-center"
							/>
							<div className="block w-[60%]">
								<p className="text-black ml-5">{center.nombre}</p>
								<p className="text-slate-500 ml-5 text-[12px] font-thin">
									{center.direccion}
								</p>
								<p className="text-slate-500 ml-5 text-[12px] font-thin">
									{center.horario}
								</p>
							</div>
							<Button
								onClick={(e) => {
									handleDelete(e, center);
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
						Crea Nuevo Centro
					</h1>
					<div className=" flex flex-col">
						<input
							type="text"
							name="user"
							value={centro}
							onChange={(e) => setCentro(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
							placeholder="Nombre del Centro"
						/>
						<input
							type="text"
							name=""
							value={direccion}
							onChange={(e) => setDireccion(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
							placeholder="Direccion"
						/>
						<p className="text-sm self-start mb-2 ml-2 text-slate-400">
							Seleccione el rol del usuario
						</p>
						<input
							type="text"
							name=""
							value={horario}
							onChange={(e) => setHorario(e.target.value)}
							className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
							placeholder="Horario"
						/>
					</div>
					{error && <p className="text-red-700 mb-2">{error}</p>}

					<Button type="button" onClick={createCenter}>
						<CirclePlus/>Agregar Centro
					</Button>
				</form>
			</div>
		</div>
	);
}
