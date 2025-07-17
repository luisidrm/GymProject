"use client";

import LandingPage from "@/components/Landing";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
	const [reservation, setReservation] = useState({
		nombre: "",
		numero: "",
		cantidad: "",
		fecha: "",
		horario: "",
		especial: "",
	});
	const [products, setProducts] = useState([]);
	const [recomended, setRecommended] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/tienda");
				setProducts(response.data.products);
				for (let i = 0; i < 3; i++) {
					recomended.push(response.data.products[i]);
					setRecommended(recomended);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const makeReservation = async () => {
		await axios
			.post("http://localhost:3000/api/reservations", {
				reservation,
			})
			.then(() => {
				toast({
					title: "Exito",
					description:
						"Reservación solicitada exitosamente nos pondremos en contacto con usted para realizar la confirmación",
				});
				setReservation({
					nombre: "",
					numero: "",
					cantidad: "",
					fecha: "",
					horario: "",
					especial: "",
				});
			}).catch((err)=>{
				toast({
					title: "Error",
					description: "Hubo un error en la reservacion. Intentalo de nuevo"
				})
			});
	};

	return (
		<div className="bg-slate-100">
			<LandingPage
				recomended={recomended}
				products={products}
				reservation={reservation}
				setReservation={setReservation}
				sendData={makeReservation}
			/>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 mb-2 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 id="menu" className="text-xl">
					Nuestra Oferta
				</h1>
			</div>
			<div className="h-[auto] bg-slate-100 px-1 w-[100%] pb-72 grid lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 shadow-md rounded-md font-semibold">
				{products.map((product) => (
					<div
						key={product.id}
						id={product.id}
						// onClick={() => selectProducts(product)}
						className={"w-[100%] h-[auto] bg-white rounded-md shadow-md mt-4 "}
					>
						<div className="flex justify-center">
							<Image
								className="flex justify-center m-5 place-items-center h-60 object-cover"
								src={product.picture}
								alt={product.nombre}
								width={200}
								height={100}
							/>
						</div>
						<div className="ml-4">
							<h2 className="">{product.nombre}</h2>
							<p className="font-thin text-slate-400">{product.description}</p>
						</div>
						<div className="ml-4 mb-2 mt-3 flex justify-between place-items-center">
							${product.venta}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
