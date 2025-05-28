import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProduct({ edit, handleEdit, element, setElement }) {
	const router = useRouter();

	const editProduct = async (element) => {
		await axios
			.post("http://localhost:3000/api/shop/edit", {
				data: {
					element,
				},
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res.data);
								
				alert(`${res.data.message} ${res.data.product.nombre}`);
				window.location.reload()
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		// <div className={edit === true ? 'h-[100vh] z-20 w-[100vw]': 'hidden'}>
		<div
			className={
				edit === true
					? "z-50 w-[100%] h-[100vh] top-0 fixed flex  backdrop-brightness-50 place-items-center overflow-hidden justify-center"
					: "hidden"
			}
		>
			<div className="flex flex-col min-w-[412px] h-[auto] w-[50%] mr-[25%] bg-slate-50 py-5 px-20 shadow-md rounded-md">
				<h2 className="text-2xl text-slate-950 mb-4 mt-2">
					Edicion del Producto
				</h2>
				{/* <label
					htmlFor="picture"
					className="text-sm text-gray-900 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Picture
				</label> */}
				{/* <input
					defaultValue={element.picture}
					onChange={(e) => setElement({ ...element, picture: e.target.value })}
					id="picture"
					type="file"
					className="flex mb-4 h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
				/> */}
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
					defaultValue={element.nombre}
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
					defaultValue={element.description}
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
					defaultValue={element.venta}
					onChange={(e) =>
						setElement({ ...element, venta: Number.parseFloat(e.target.value) })
					}
				/>
				<div className="flex justify-center ">
					<button
						onClick={() => editProduct(element)}
						className="h-10 px-8 bg-slate-800 mr-4 text-white rounded-lg shadow-lg hover:opacity-95 active:opacity-70"
						type="button"
					>
						Editar
					</button>
					<button
						className="h-10 px-6 bg-red-800 text-white rounded-lg shadow-lg hover:opacity-90 active:opacity-70"
						onClick={() => handleEdit({})}
						type="button"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
		// </div>
	);
}
