import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct({ add, handleAdd, setRefresh, refresh }) {
	const router = useRouter();
	const {toast} = useToast()

	const [element, setElement] = useState({
		picture: {},
		nombre: "",
		description: "",
		venta: 0,
	});

	const addProduct = async () => {
		console.log(element);
		await axios
			.post(
				"http://localhost:3000/api/shop/create",
				{
					data:{
						element: element,
					}
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			)
			.then((res) => {
				handleAdd()
				toast({ title: "Exito", description: res.data.message });
				setRefresh(!refresh)
			})
			.catch((error) => {
				toast({ title: "Error", description: error.message });
			});
	};

	return (
		<div
			className={
				add === true
					? "z-50 w-[100%] h-[100%] fixed top-0 flex  backdrop-brightness-50 place-items-center justify-center"
					: "hidden"
			}
		>
			<div className="flex flex-col min-w-[412px] h-[auto] w-[50%] mr-[25%] bg-slate-50 py-5 px-20 shadow-md rounded-md">
				<h2 className="text-2xl text-slate-950 mb-4 mt-2 font-semibold">
					Agregar un Producto
				</h2>
				<label
					htmlFor="picture"
					className="text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Picture
				</label>
				<input
					onChange={(e) =>
						setElement({ ...element, picture: e.target.files[0] })
					}
					id="picture"
					type="file"
					className="flex mb-4 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
				/>
				<label
					htmlFor="nombre"
					className="text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Nombre
				</label>
				<input
					className="flex mb-4 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
					type="text"
					name=""
					id="nombre"
					value={element.nombre}
					onChange={(e) => setElement({ ...element, nombre: e.target.value })}
				/>
				<label
					htmlFor="description"
					className="text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Descripcion
				</label>
				<input
					className="flex mb-4 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
					type="text"
					name=""
					id="description"
					value={element.description}
					onChange={(e) =>
						setElement({ ...element, description: e.target.value })
					}
				/>
				<label
					htmlFor="venta"
					className="text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Precio
				</label>
				<input
					className="flex mb-4 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
					type="number"
					name=""
					id="venta"
					value={element.venta}
					onChange={(e) => setElement({ ...element, venta: e.target.value })}
				/>
				<div className="flex justify-center">
					<button
						onClick={() => addProduct()}
						className="h-10 px-8 bg-slate-800 mr-4 text-white rounded-lg shadow-lg hover:opacity-95 active:opacity-70"
						type="button"
					>
						Agregar
					</button>
					<button
						className="h-10 px-6 bg-red-800 text-white rounded-lg shadow-lg hover:opacity-90 active:opacity-70"
						onClick={handleAdd}
						type="button"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}
