"use client";

import LandingPage from "@/components/Landing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/shop");
				setProducts(response.data.products);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	

	return (
		<div>
			<LandingPage products ={products} />
				<h2 className="text-center bg-slate-100 text-2xl font-semibold font-[Helvetica]">Consulta Nuestro Menu</h2>
			<div className="h-[auto] bg-slate-100 w-[100%] pb-72 grid lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 shadow-md rounded-md font-semibold">
				{products.map((product) => (
					<div
						key={product.id}
						id={product.id}
						// onClick={() => selectProducts(product)}
						className={
							"w-[100%] min-w-[220px] h-[auto] bg-white rounded-md shadow-md mt-4 "
						}
					>
						<div className="flex justify-center">
							<Image
								className="flex justify-center m-5 place-items-center"
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
