"use client";

import { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "../components/ui/table.jsx";
import { Button } from "./ui/button.jsx";
import { SidebarClose } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast.js";

export default function TablaCompra({
	cart,
	handleCart,
	setProducts,
	selectedProduct,
	setSelectedProduct,
	setRefresh,
	refresh
}) {
	const {toast} = useToast()

	const costoTotal = () => {
		let total = 0;
		selectedProduct.map((product) => {
			total =
				total +
				Number.parseFloat(product.venta) *
					Number.parseFloat(product.cantidad || 1);
		});
		return total;
	};

	const updateCantidad = (id, e) => {
		setSelectedProduct((prevItems) =>
			prevItems.map((item) =>
				item.id === id
					? { ...item, cantidad: Number.parseFloat(e.target.value) }
					: item,
			),
		);
	};

	const completarVenta = async () => {
		await axios
			.post("http://localhost:3000/api/shop", {
					products: selectedProduct,
					fullPrice: costoTotal(),

			})
			.then((res) => {
				handleCart()
				toast({ title: "Exito", description: res.data.message });
				setSelectedProduct([])
				setRefresh(!refresh)
			})
			.catch((err) => {
				toast({ title: "Error", description: err.message });

			});
	};

	return (
		<div
			className={
				cart
					? "w-[100%] h-[100%] flex justify-center place-items-center absolute backdrop-brightness-50 z-20"
					: "hidden"
			}
		>
			<Table className="bg-slate-100 w-[50%] ml-[] mr-[25%] rounded-lg overflow-clip ">
				<TableCaption className="text-white">
					Lista completa de la compra.
				</TableCaption>
				<TableHeader>
					<TableRow className="text-lg h-[50px]">
						<TableHead className="pr-4">Productos</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead className="text-center">Cantidad</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{selectedProduct.map((product) => (
						<TableRow key={product.id}>
							<TableCell className="font-medium pr-4">
								{product.nombre}
							</TableCell>
							<TableCell>{product.venta}</TableCell>
							<TableCell className="flex justify-center">
								{" "}
								<input
									type="number"
									id={product.id}
									className="w-12 text-center border border-gray-300 outline-none rounded-lg no-arrows"
									step="1"
									value={
										product.cantidad !== undefined
											? Number.parseFloat(product.cantidad)
											: 1
									}
									onChange={(e) => updateCantidad(product.id, e)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={2}>Total</TableCell>
						<TableCell className="text-center">${costoTotal()}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2} className="flex justify-end">
							<Button
								type="button"
								onClick={completarVenta}
								className="hover:text-slate-900 hover:bg-white"
							>
								Completar Venta <SidebarClose />
							</Button>
						</TableCell>
						<TableCell>
							<Button
								onClick={()=>{handleCart();setSelectedProduct([])}}
								className="bg-white text-black hover:text-white"
								type="button"
							>
								Cancelar
							</Button>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
