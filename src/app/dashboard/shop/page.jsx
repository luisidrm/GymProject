"use client";

import EditProduct from "@/components/EditProduct";
import axios from "axios";
import Image from "next/image";
import { AlertDialogDemo } from "../../../components/AlertDialog.jsx";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { Button } from "@/components/ui/button.jsx";
import {
	CirclePlus,
	MessageCircleDashed,
	Notebook,
	NotebookText,
	Pencil,
	ShoppingBasket,
	Trash,
	Warehouse,
} from "lucide-react";
import TablaCompra from "@/components/TablaCompra.jsx";
import { data } from "autoprefixer";
import AddProduct from "@/components/AddProduct.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Loading from "./loading.jsx";
import Link from "next/link.js";
import { useSession } from "next-auth/react";

export default function Page() {
	const { data: session } = useSession();

	const { toast } = useToast();

	const [add, setAdd] = useState(false);
	const [edit, setEdit] = useState(false);
	const [elim, setElim] = useState(false);
	const [cart, setCart] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const [products, setProducts] = useState([]);
	const [center, setCenter] = useState([]);
	const [selectedCenter, setSelectedCenter] = useState(
		session?.user?.role === "Administrador" ? -1 : session?.user?.centro,
	);

	const [element, setElement] = useState({});
	const [selectedProduct, setSelectedProduct] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/shop", {
					params: {
						centro: selectedCenter,
					},
				});
				setProducts(response.data.products);
				setCenter(response.data.centers);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [refresh, selectedCenter]);

	const handleCart = () => {
		setCart(!cart);
	};
	const handleAdd = () => {
		setAdd(!add);
	};

	const handleEdit = (product) => {
		setElement(product);
		setEdit(!edit);
	};
	const handleDelete = (product) => {
		setElement(product);
		setElim(!elim);
	};

	// const editProd = async(product)=>{
	// 	await axios.patch("http://localhost:3000/api/shop",{
	// 		data:{
	// 			element: product
	// 		}
	// 	})

	// }

	const deleteProd = async (product) => {
		await axios
			.delete("http://localhost:3000/api/shop", {
				data: {
					id: product.id,
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
	console.log(selectedCenter);

	const selectProducts = (product) => {
		setSelectedProduct([...selectedProduct, product]);
		if (selectedProduct.some((prod) => prod.id === product.id) === false) {
			document
				.getElementById(product.id)
				.classList.add("border", "border-black");
		} else {
			const deleteOne = selectedProduct.find((prod) => prod.id === product.id);
			const newSelected = selectedProduct.filter((prod) => prod !== deleteOne);
			setSelectedProduct(newSelected);
			document
				.getElementById(product.id)
				.classList.remove("border", "border-black");
		}
	};
	return (
		<div className="w-full max-lg:h-auto h-[100%] min-h-[100vh] bg-slate-100 text-black user-select-none">
			{add && (
				<AddProduct
					add={add}
					handleAdd={handleAdd}
					setRefresh={setRefresh}
					refresh={refresh}
					selectedCenter={selectedCenter}
				/>
			)}
			{edit && (
				<EditProduct
					edit={edit}
					handleEdit={handleEdit}
					element={element}
					setElement={setElement}
					setRefresh={setRefresh}
					refresh={refresh}
					selectedCenter={selectedCenter}
				/>
			)}
			{elim && (
				<AlertDialogDemo
					elim={elim}
					handleDelete={handleDelete}
					element={element}
					deleteProd={deleteProd}
				/>
			)}
			{selectedProduct.length > 0 && (
				<TablaCompra
					cart={cart}
					handleCart={handleCart}
					selectedProduct={selectedProduct}
					setSelectedProduct={setSelectedProduct}
					setRefresh={setRefresh}
					refresh={refresh}
					selectedCenter={selectedCenter}
				/>
			)}
			<Button
				className="w-auto h-[50px] z-10 rounded-full shadow-xl fixed top-[85%] left-[80%] bg-slate-900 flex justify-center place-items-center text-center"
				disabled={selectedProduct.length === 0}
				onClick={handleCart}
			>
				<ShoppingBasket />
				<span className="max-md:hidden">Venta</span>
				{selectedProduct.length > 0 ? (
					<div className="absolute w-[20px] h-[20px] right-[-8px] top-[-8px] z-20 rounded-full bg-red-600">
						{selectedProduct.length}
					</div>
				) : (
					""
				)}
			</Button>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between ">
				<h1 className="xl:text-xl md:text-lg">Store Management</h1>
				<div className="flex gap-3">
					{selectedCenter !== -1 && (
						<Link
							href={{
								pathname: "/dashboard/shop/stock",
								query: { selectedCenter: selectedCenter },
							}}
							className="bg-[#0f172a] inline-flex items-center md:px-2 px-6 place-items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
						>
							<Warehouse stroke="white" />
							<span className="max-md:hidden text-white">Stock</span>
						</Link>
					)}
					{selectedCenter !== -1 && (
						<Link
							href={{
								pathname: "/dashboard/shop/cuadre",
								query: { selectedCenter: selectedCenter },
							}}
							className="bg-[#0f172a] inline-flex items-center md:px-2 px-6 place-items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
						>
							<NotebookText stroke="white" />
							<span className="max-md:hidden text-white">Cuadre</span>
						</Link>
					)}
					{selectedCenter !== -1 && (
						<Button onClick={handleAdd} className="rounded-full">
							<CirclePlus size={48} />
						</Button>
					)}
				</div>
			</div>
			<div className="w-[100%] h-auto bg-transparent flex justify-center">
				{session?.user?.role === "Administrador" && (
					<span className="h-[50px] w-[98%] mx-[1%] mt-4  bg-slate-950 flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold ">
						{center.map((center) => (
							<button
								type="button"
								key={center.id}
								onClick={() => setSelectedCenter(center.id)}
								className={`${center.id === selectedCenter && "border-b-white"} text-white border-transparent py-2 border-b-2 px-4 hover:border-b-2 hover:border-white`}
							>
								{center.nombre}
							</button>
						))}
					</span>
				)}
			</div>
			<div className="h-[auto] min-h-60 w-[98%] pb-32 mt-4 grid lg:grid-cols-3 gap-3 xl:grid-cols-4 grid-cols-2 px-5 shadow-md rounded-md font-semibold">
				{selectedCenter === -1 && (
					<p className="absolute pt-32 w-[100%] place-items-center">
						Seleccione un centro para comenzar a trabajar
					</p>
				)}
				{selectedCenter !== -1 &&
					products.map((product) => (
						<div
							key={product.id}
							id={product.id}
							role="button"
							tabIndex={0}
							onClick={() => selectProducts(product)}
							className={`w-[100%] min-w-[150px] h-auto bg-white rounded-md shadow-md mt-4 ${selectedProduct.some((prod) => prod.id === product.id) ? "border border-black" : ""}`}
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
								<p className="font-thin text-slate-400">
									{product.description}
								</p>
							</div>
							<div className="ml-4 mb-2 mt-3 flex justify-between place-items-center">
								${product.venta}
								<div className="">
									<Button
										onClick={(e) => {
											handleEdit(product);
											e.stopPropagation();
										}}
										type="button"
										className="w-10 mr-2 rounded-md z-30 h-8 shadow-md hover:scale-105 hover:border-2 hover:border-slate-300 text-white "
									>
										<Pencil />
									</Button>
									<Button
										onClick={(e) => {
											handleDelete(product);
											e.stopPropagation();
										}}
										type="button"
										className="w-10 mr-2 rounded-md h-8 z-30 shadow-md hover:scale-105 hover:border-2 hover:border-slate-300 text-white bg-red-700 "
									>
										<Trash />
									</Button>
								</div>
							</div>
						</div>
					))}
				{products.length === 0 && (
					<p className="absolute pt-32 w-[100%] place-items-center">
						No existen productos en este centro
					</p>
				)}
			</div>
		</div>
	);
}
