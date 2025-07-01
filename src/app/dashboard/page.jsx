"use client";

import { AlertDialogDemo } from "@/components/AlertDialog";
import ShowRequest from "@/components/ShowRequest";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { CalendarFold, List, Text, Trash } from "lucide-react";
import { fetchData } from "next-auth/client/_utils";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const [data, setData] = useState([]);
	const [element, setElement] = useState({});

	const [request, setRequest] = useState("");
	const [show, setShow] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [eliminar, setEliminar] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/reservations")
				.then((res) => {
					setData(res.data.reservations);
				})
				.catch((err) => {
					toast({
						title: "Error",
						description: "Hubo un error al cargar los datos",
					});
				});
		};
		fetchData();
	}, [refresh]);

	const handleDelete = (item) => {
		setElement(item);
		setEliminar(!eliminar);
	};
	const handleShow = (especial) => {
		setRequest(especial);
		setShow(!show);
	};

	const deleteReservation = async (element) => {
		await axios
			.delete("http://localhost:3000/api/reservations", {
				data: {
					id: element.id,
				},
			})
			.then((res) => {
				setRefresh(!refresh);
				toast({
					title: "Exito",
					description: "Se elimino correctamente la reservación",
				});
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.response.data.message,
				});
			});
	};

	return (
		<div className="w-[80%] ml-[20%] h-auto sm:h-[100%] pb-[200px] md:pb-[500px] bg-slate-100 text-black user-select-none">
			{eliminar && (
				<AlertDialogDemo
					elim={eliminar}
					handleDelete={handleDelete}
					element={element}
					deleteProd={deleteReservation}
				/>
			)}
			{show && (
				<ShowRequest show={show} request={request} handleShow={handleShow} />
			)}
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 mb-2 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 className="text-xl">Reservations</h1>
			</div>
			<div className=" mx-3 shadow-md grid md:grid-cols-2 grid-cols-1 gap-3">
				{data.map((item) => (
					<div
						key={item.id}
						onClick={() => handleShow(item.especial.toString())}
						className="h-[150px] flex relative bg-white rounded-md shadow-md"
					>
						{item.especial && (
							<div className="absolute w-[20px] h-[20px] right-[-8px] top-[-8px] z-20 rounded-full bg-blue-950 place-items-center">
								<List stroke="white" size={16} className="mt-[2px]" />
							</div>
						)}
						<div className="h-full w-[20%] flex justify-center place-items-center">
							<CalendarFold size={48} className="" />
						</div>
						<div className="my-2 w-[65%]">
							<div className={`${item.especial ? "h-[50%]" : "h-[100%]"}`}>
								<h1 className="text-sm font-semibold flex justify-between mb-3">
									<span>{item.horario}</span>{" "}
									<span>{item.fecha.split("T")[0]}</span>
								</h1>
								<h1 className="text-lg font-semibold">{item.nombre}</h1>
								<h2 className="text-md font-thin">+{item.numero}</h2>
								<h2 className="text-md font-thin">{item.cantidad} personas</h2>
							</div>
						</div>
						<div className="flex justify-center place-items-center">
							<Button
								onClick={(e) => {
									handleDelete(item);
									e.stopPropagation();
								}}
								variant="error"
								className="bg-transparent h-auto w-auto"
							>
								<Trash className="stroke-red-700" size={32} />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
