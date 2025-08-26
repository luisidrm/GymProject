"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
	const [data, setData] = useState([]);
	const [centers, setCenters] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/movements")
				.then((res) => {
					setData(res.data.movements);
					setCenters(res.data.centers);
				})
				.catch((err) => {
					setError(err.message);
				});
		};
		fetchData();
	},[]);

	return (
		<div className="w-full max-lg:h-auto h-auto bg-slate-100 text-black user-select-none">
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between">
				<h1 className="text-xl">Historial de Movimientos</h1>
			</div>
			<div className="h-[auto] min-h-60 w-[98%] pb-32 text-center place-content-center  mt-4 px-5 shadow-md rounded-md font-semibold bg-white mx-[1%]">
				{error === "" ? (
					centers.map((center) => (
            <div className="w-full h-auto mb-16" key={center.id}>
              <h1 className="w-full text-center text-2xl my-6 font-semibold">{center.nombre}</h1>
						<Table className="">
							<TableHeader>
								<TableRow>
									<TableCell
										style={{
											width: "80px",
											padding: "0",
										}}
                    />
									<TableHead>Fecha</TableHead>
									<TableHead>Producto</TableHead>
									<TableHead>Nota</TableHead>
									<TableHead>Cantidad</TableHead>
									<TableHead>Tipo</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((item) => (
                  item.producto.id_centro === center.id && (
									<TableRow key={item.id} className="rounded-md">
										<TableCell>
											<Image
												className="w-20 h-auto rounded-full place items-center shadow-lg object-cover"
												src={item.producto.picture}
												alt={item.producto.nombre}
												width={100}
												height={100}
                        />
										</TableCell>
										<TableCell>{item.fecha.split("T")[0]}</TableCell>
										<TableCell>{item.producto.nombre}</TableCell>
										<TableCell>{item.nota}</TableCell>
										<TableCell>{item.cantidad}</TableCell>
										<TableCell>{item.tipo}</TableCell>
									</TableRow>
								)))}
							</TableBody>
						</Table>
        </div>
					))
				) : (
					<p className="text-red-700 w-[100%]">{error}</p>
				)}
			</div>
		</div>
	);
}
