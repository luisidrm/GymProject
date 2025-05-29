"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import Link from "next/link";
import axios from "axios";
import { Plus } from "lucide-react";
import { ContextMenuDemo } from "@/components/ContextMenu";
import { AlertDialogDemo } from "@/components/AlertDialog";
import { useToast } from "@/hooks/use-toast";

export default function Clients() {
	const { toast } = useToast();

	const [cliente, setCliente] = useState([]);
	const [price, setPrice] = useState();
	const [elim, setElim] = useState(false);
	const [element, setElement] = useState({});
	const [refresh, setRefresh] = useState(false);

	const [foundElements, setFoundElements] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/clients");

				setCliente(response.data.clients);
				setPrice(response.data.price);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [refresh]);

	const changeStatus = async (e, id) => {
		// REVISAR DETALLADAMENTE ESTA FUNCION
		e.preventDefault();
		await axios
			.post("http://localhost:3000/api/clients/payments", {
				id: id,
				month: obtenerMes(),
				price: price,
			})
			.then((res) => {
				toast({ title: "Exito", description: res.data.message });
				setRefresh(!refresh);
			});
	};

	const updatePrice = async () => {
		await axios
			.post("http://localhost:3000/api/clients/price", {
				price,
			})
			.then(() => {
				toast({ title: "Exito", description: "Precio actualizado" });
			});
	};

	const obtenerMes = () => {
		const fecha = new Date(); // Obtiene la fecha del dispositivo
		const mes = fecha.getMonth(); // getMonth() devuelve de 0 (Enero) a 11 (Diciembre), por eso sumamos 1
		return months[mes]; // Devuelve el mes en texto
	};

	const resetMonth = async () => {
		await axios
			.patch("http://localhost:3000/api/clients/payments", {
				reset: true,
			})
			.then((res) => {
				toast({ title: "Exito", description: res.data.message });
				setRefresh(!refresh);
			});
	};

	const handleDelete = (e, element) => {
		e.preventDefault();
		setElement(element);
		setElim(!elim);
	};

	const deleteClient = async (element) => {
		await axios
			.delete("http://localhost:3000/api/clients", {
				data: {
					id_ciente: element.id_ciente,
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
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-auto bg-slate-100 text-black user-select-none">
			<AlertDialogDemo
				elim={elim}
				handleDelete={handleDelete}
				element={element}
				deleteProd={deleteClient}
			/>

			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between">
				<h1 className="text-xl">Client's Information</h1>
				<div className="flex place-items-center">
					<input
						type="number"
						className="w-20 px-2 py-1 text-center font-light [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						placeholder="Precio"
						value={price ?? 0}
						onChange={(e) => setPrice(e.target.value)}
						onBlur={updatePrice}
					/>
					<h2 className="text-slate-500 ml-2">{obtenerMes()}</h2>
					<ContextMenuDemo resetMonth={resetMonth} />
				</div>
			</div>
			<div className="flex justify-between h-[35px] pl-[7%] pr-[4%] my-5">
				<SearchComponent
					placeholder="Search Clients"
					isSearching={isSearching}
					setIsSearching={setIsSearching}
					foundElements={foundElements}
					setFoundElements={setFoundElements}
				/>
				<Link
					className="md:px-4 py-2 flex bg-slate-900 px-4 text-white place-items-center rounded-lg shadow-lg"
					href="/dashboard/clients/createClients"
				>
					<Plus />
					<span className="max-lg:hidden text-center">Crear Cliente</span>
				</Link>
			</div>
			{isSearching && foundElements.length === 0 ? (
				<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center ">
					<h2>No Results</h2>
				</div>
			) : (
				<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
					<h2>Resultados</h2>
				</div>
			)}
			<div
				className={
					isSearching && foundElements.length > 0
						? "h-[auto] pb-10 w-[98%] user-select-none mx-[1%] gap-[2%] mt-5 bg-slate-100 shadow-md rounded-lg grid md:grid-cols-2 grid-cols-1"
						: "hidden"
				}
			>
				{foundElements.length > 0
					? foundElements.map((client) => (
							<div
								onContextMenu={(e) => handleDelete(e, client)}
								onDoubleClick={(e) => changeStatus(e, client.id_ciente)}
								className={
									client.estado === true
										? "h-auto w-[100%] p-5 px-5 border-b-2 border-r-2 rounded-lg mt-2 bg-white border-green-400"
										: "h-auto w-[100%] p-5 px-5 border-b-2 border-r-2 rounded-lg mt-2 bg-white border-red-500"
								}
								key={client.id_ciente}
							>
								<div className="flex place-items-center mb-2 justify-between">
									<div className="flex place-items-center">
										<Image
											src={client.picture}
											width={50}
											height={50}
											alt={client.nombre}
											className="rounded-xl"
										/>
										<div className="block">
											<h3 className="ml-4">{client.nombre} </h3>
											<h3 className=" ml-4 text-slate-400 text-sm">
												{client.ci}
											</h3>
										</div>
									</div>
									<h3 className="">{client.numero_inscripcion}</h3>
								</div>
								<hr className="mb-1" />
								<div className="flex text-sm bg-slate-100 text-slate-500 rounded-md">
									<div className=" pl-3">
										<h3 className="">Horario: {client.horario}</h3>
										<h3>Fecha inicial: {getCurrentDate(client.fecha)}</h3>
										<h3>
											Tarifa:
											{client.plan === false ? " General" : " Personalizado"}
										</h3>
									</div>
									<div className="pl-3">
										<h3 className="">Telefono: {client.telefono}</h3>
										<h3 className="">Entrenador: {client.nombre_entrenador}</h3>
										<h3
											className={
												client.estado === true
													? "text-green-400"
													: "text-red-500"
											}
										>
											{client.estado === true ? "pagado" : "no pagado"}
										</h3>
									</div>
								</div>
							</div>
						))
					: ""}
			</div>
			<div
				className={
					isSearching === true
						? "h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center "
						: "hidden"
				}
			>
				<h2>Todos los Clientes</h2>
			</div>
			<div
				className="h-[auto] pb-10 w-[98%] user-select-none mx-[1%] gap-[2%] mt-5 mb-12
       bg-slate-100 shadow-md rounded-lg grid md:grid-cols-2 grid-cols-1"
			>
				{cliente.map((client) => (
					<div
						onContextMenu={(e) => handleDelete(e, client)}
						onDoubleClick={(e) => changeStatus(e, client.id_ciente)}
						className={
							client.estado === true
								? "h-auto w-[100%] p-5 px-5 border-b-2 border-r-2 rounded-lg mt-2 bg-white border-green-400"
								: "h-auto w-[100%] p-5 px-5 border-b-2 border-r-2 rounded-lg mt-2 bg-white border-red-500"
						}
						key={client.id_ciente}
					>
						<div className="flex place-items-center mb-2 justify-between">
							<div className="flex place-items-center">
								<Image
									src={client.picture}
									width={50}
									height={50}
									alt={client.nombre}
									className="rounded-xl"
								/>
								<div className="block">
									<h3 className="ml-4">{client.nombre} </h3>
									<h3 className=" ml-4 text-slate-400 text-sm">{client.ci}</h3>
								</div>
							</div>
							<h3 className="">{client.numero_inscripcion}</h3>
						</div>
						<hr className="mb-1" />
						<div className="flex text-sm bg-slate-100 text-slate-500 rounded-md">
							<div className=" pl-3">
								<h3 className="">Horario: {client.horario}</h3>
								<h3>Fecha inicial: {getCurrentDate(client.fecha)}</h3>
								<h3>
									Tarifa:{client.plan === false ? " General" : " Personalizado"}
								</h3>
							</div>
							<div className="pl-3">
								<h3 className="">Telefono: {client.telefono}</h3>
								<h3 className="">Entrenador: {client.nombre_entrenador}</h3>
								<h3
									className={
										client.estado === true ? "text-green-400" : "text-red-500"
									}
								>
									{client.estado === true ? "pagado" : "no pagado"}
								</h3>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function getCurrentDate(fecha) {
	const ppe = new Date(Date.parse(fecha));
	return `${ppe.getUTCDay()}/${ppe.getMonth()}/${ppe.getFullYear()}`;
}
