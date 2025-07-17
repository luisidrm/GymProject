"use client";

import EditProduct from "@/components/EditProduct";
import axios from "axios";
import Image from "next/image";
import { AlertDialogDemo } from "../../../components/AlertDialog.jsx";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { Button } from "@/components/ui/button.jsx";
import { CirclePlus, MessageCircleDashed, Notebook, NotebookText, Pencil, ShoppingBasket, Trash } from "lucide-react";
import TablaCompra from "@/components/TablaCompra.jsx";
import { data } from "autoprefixer";
import AddProduct from "@/components/AddProduct.jsx";
import { useToast } from "@/hooks/use-toast.js";
import Loading from "./loading.jsx";
import Link from "next/link.js";

export default function Page() {
	const { toast } = useToast();

	const [add, setAdd] = useState(false);
	const [edit, setEdit] = useState(false);
	const [elim, setElim] = useState(false);
	const [cart, setCart] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const [products, setProducts] = useState([]);
	const [element, setElement] = useState({});
	const [selectedProduct, setSelectedProduct] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/shop");
				console.log(response);
				setProducts(response.data.products);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [refresh]);

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
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-[100%] min-h-[100vh] bg-slate-100 text-black user-select-none">
			{add && (
				<AddProduct
					add={add}
					handleAdd={handleAdd}
					setRefresh={setRefresh}
					refresh={refresh}
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
				/>
			)}
			<Link href={'/dashboard/shop/cuadre'} className="w-[50px] h-[50px] z-10 rounded-full shadow-xl fixed top-[85%] left-[90%] bg-slate-900 flex justify-center place-items-center text-center">
				<NotebookText stroke="white"/>
			</Link>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between ">
				<h1 className="xl:text-xl md:text-lg">Store Management</h1>
				<div className="flex gap-3">
					<Button onClick={handleCart} className="relative">
						<ShoppingBasket />
						<span className="max-md:hidden">Carrito</span>
						{selectedProduct.length > 0 ? (
							<div className="absolute w-[20px] h-[20px] right-[-8px] top-[-8px] z-20 rounded-full bg-red-600">
								{selectedProduct.length}
							</div>
						) : (
							""
						)}
					</Button>
					<Button onClick={handleAdd} className="rounded-full">
						<CirclePlus size={48} />
					</Button>
				</div>
			</div>
			<div className="h-[auto] w-[98%] pb-32 mt-4 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 px-5 shadow-md rounded-md font-semibold">
				{products.map((product) => (
					<Suspense key={product.id} callback={<Loading />}>
						<div
							key={product.id}
							id={product.id}
							role="button"
							tabIndex={0}
							onClick={() => selectProducts(product)}
							className={`w-[100%] min-w-[250px] h-[auto] bg-white rounded-md shadow-md mt-4 ${selectedProduct.some((prod) => prod.id === product.id) ? "border border-black" : ""}`}
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
					</Suspense>
				))}
			</div>
		</div>
	);
}
