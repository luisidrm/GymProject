"use client";
import EntryExit from "@/components/EntryExit";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ArrowBigDownDash, ArrowBigUpDash, CirclePlus } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const searchParams = useSearchParams();
	const selectedCenter = searchParams.get("selectedCenter");

	const [data, setData] = useState([]);

	const [prods, setProds] = useState([]);

	const [movement, setMovement] = useState(false);
	const [operation, setOperation] = useState("ENTRADA");
	const [description, setDescription] = useState("");
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/stock", {
					params: {
						centro: selectedCenter,
					},
				})
				.then((res) => {
					setData(res.data.allProducts);
				})
				.catch((err) => {});
		};
		fetchData();
	}, [refresh]);

	const addItem = (item) => {
		if (prods.some((p) => p.id === item.id)) {
			const deleteItem = prods.find((p) => p.id === item.id);
			const result = prods.filter((p) => p.id !== deleteItem.id);
			setProds(result);
			document.getElementById(item.id).classList.remove("bg-slate-400");
		} else {
			setProds([...prods, item]);
			document.getElementById(item.id).classList.add("bg-slate-400");
		}
	};

	const handleMovement = () => {
		setMovement(!movement);
	};

	const completeAction = async () => {
		await axios
			.post("http://localhost:3000/api/stock", {
				operation,
				description,
				prods,
			})
			.then((res) => {
				handleMovement()
				toast({
					title: "Exito",
					description: "Se ha actualizado la existencia en el centro actual",
				});
				setRefresh(!refresh);
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: "Ha ocurrido un error",
				});
			});
	};

	return (
		<div className="w-full max-lg:h-auto h-[100%] min-h-[100vh] bg-slate-100 text-black user-select-none">
			{movement && (
				<EntryExit
					operation={operation}
					setOperation={setOperation}
					handleMovement={handleMovement}
					completeAction={completeAction}
					prods={prods}
					setProds={setProds}
					description={description}
					setDescription={setDescription}
				/>
			)}
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between ">
				<h1 className="xl:text-xl md:text-lg">Stock Management</h1>
			</div>
			<div
				className={`h-[60px] w-auto px-2 place-self-center ${prods.length <= 0 && "opacity-50"} mx-[1%] mt-4 bg-slate-900 backdrop-blur-md fixed top-[85%] flex place-items-center gap-3 user-select-none font-semibold justify-center rounded-full`}
			>
				<Button
					variant=""
					disabled={prods.length <= 0}
					onClick={handleMovement}
				>
					<CirclePlus />
					<span className="max-md:hidden">Movimiento</span>
					{prods.length > 0 && (
						<div className="absolute w-[20px] h-[20px] right-[-5px] top-[-8px] z-20 rounded-full bg-red-600">
							{prods.length}
						</div>
					)}
				</Button>
			</div>
			<div className="h-[auto] min-h-60 w-[98%] pb-32 mt-4 px-5 shadow-md rounded-md font-semibold bg-white mx-[1%]">
				<Table className="">
					<TableCaption>Productos en existencia</TableCaption>
					<TableHeader>
						<TableRow>
							<TableCell
								style={{
									width: "80px",
									padding: "0",
								}}
							/>
							<TableHead>Producto</TableHead>
							<TableHead>Precio Compra</TableHead>
							<TableHead>Precio Venta</TableHead>
							<TableHead>Existencia</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => (
							<TableRow
								key={item.id}
								onClick={() => addItem(item)}
								id={item.id}
								role="button"
								className="rounded-md"
							>
								<TableCell>
									<Image
										className="w-20 h-auto rounded-full place items-center shadow-lg object-cover"
										src={item.picture}
										alt={item.nombre}
										width={100}
										height={100}
									/>
								</TableCell>
								<TableCell>{item.nombre}</TableCell>
								<TableCell>${item.compra}</TableCell>
								<TableCell>${item.venta}</TableCell>
								<TableCell>{item.cantidad}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
