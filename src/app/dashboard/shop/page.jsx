"use client";

import EditProduct from "@/components/EditProduct";
import axios from "axios";
import Image from "next/image";
import { AlertDialogDemo } from "../../../components/AlertDialog.jsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation.js";
import { Button } from "@/components/ui/button.jsx";
import { CirclePlus, Pencil, ShoppingBasket, Trash } from "lucide-react";
import TablaCompra from "@/components/TablaCompra.jsx";
import { data } from "autoprefixer";
import AddProduct from "@/components/AddProduct.jsx";
import { useToast } from "@/hooks/use-toast.js";

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

	console.log(selectedProduct);
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
			<AddProduct
				add={add}
				handleAdd={handleAdd}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
			<EditProduct
				edit={edit}
				handleEdit={handleEdit}
				element={element}
				setElement={setElement}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
			<AlertDialogDemo
				elim={elim}
				handleDelete={handleDelete}
				element={element}
				deleteProd={deleteProd}
			/>
			<TablaCompra
				cart={cart}
				handleCart={handleCart}
				selectedProduct={selectedProduct}
				setSelectedProduct={setSelectedProduct}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
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
			<div className="h-[auto] w-[98%] mt-4 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 px-5 shadow-md rounded-md font-semibold">
				{products.map((product) => (
					<div
						key={product.id}
						id={product.id}
						// biome-ignore lint/a11y/useSemanticElements: <explanation>
						role="button"
						tabIndex={0}
						onClick={() => selectProducts(product)}
						onKeyDown={() => selectProducts(product)}
						className={`w-[100%] min-w-[250px] h-[auto] bg-white rounded-md shadow-md mt-4 ${selectedProduct.some((prod) => prod.id === product.id) ? "border border-black" : ""}`}
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
							<div className="">
								<Button
									onClick={() => handleEdit(product)}
									type="button"
									className="w-10 mr-2 rounded-md h-8 shadow-md hover:scale-105 hover:border-2 hover:border-slate-300 text-white "
								>
									<Pencil />
								</Button>
								<Button
									onClick={() => handleDelete(product)}
									type="button"
									className="w-10 mr-2 rounded-md h-8 shadow-md hover:scale-105 hover:border-2 hover:border-slate-300 text-white bg-red-700 "
								>
									<Trash />
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
