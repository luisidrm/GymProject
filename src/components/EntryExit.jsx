import { SidebarClose } from "lucide-react";
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

export default function EntryExit({
	operation,
	setOperation,
	handleMovement,
	completeAction,
	prods,
	setProds,
	description,
	setDescription,
}) {
	const updateCantidad = (id, e) => {
		setProds((prevItems) =>
			prevItems.map((item) =>
				item.id === id
					? { ...item, modification: Number.parseFloat(e.target.value) }
					: item,
			),
		);
	};
	return (
		<div className="z-50 w-[100vw] h-[100vh] fixed top-0 flex backdrop-brightness-50 place-items-center ">
			<div className="flex flex-col min-w-[412px] h-[auto] w-[80%] md:w-[50%] bg-slate-50 py-5 px-20 shadow-md rounded-md fixed left-[10%] md:left-[25%]">
				<select
					value={operation}
					onChange={(e) => setOperation(e.target.value)}
					className="flex place-self-center mb-4 h-12 w-[150px] rounded-md border-none border-input bg-transparent px-3 py-2 text-xl text-gray-900 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
				>
					<option value="ENTRADA">Entrada</option>
					<option value="SALIDA">Salida</option>
				</select>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="flex mb-2 mx-3 h-20 w-[96%] rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
					type="text"
					placeholder="Describa el movimiento"
				/>
				<Table>
					<TableHeader>
						<TableRow className="text-lg h-[50px]">
							<TableHead className="pr-4">Productos</TableHead>
							<TableHead className="text-center">Cantidad</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{prods.map((product) => (
							<TableRow key={product.id}>
								<TableCell className="font-medium pr-4">
									{product.nombre}
								</TableCell>
								<TableCell className="flex justify-center">
									{" "}
									<input
										type="number"
										id={product.id}
										className="w-12 text-center border border-gray-300 outline-none rounded-lg no-arrows"
										step="1"
										value={product.modification??0}
										onChange={(e) => updateCantidad(product.id, e)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2} className="flex justify-end">
								<Button
									type="button"
									onClick={completeAction}
									className="hover:text-slate-900 hover:bg-white"
								>
									Completar Accion <SidebarClose />
								</Button>
							</TableCell>
							<TableCell colSpan={2}>
								<Button
									onClick={() => {
										handleMovement();
									}}
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
		</div>
	);
}
