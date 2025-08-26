import { useState } from "react";
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

export default function Calculadora({
	calculadora,
	handleCalculadora,
	money,
	setMoney,
}) {
	const [bills, setBills] = useState([
		{ denomination: 1000, cantidad: undefined },
		{ denomination: 500, cantidad: undefined },
		{ denomination: 200, cantidad: undefined },
		{ denomination: 100, cantidad: undefined },
		{ denomination: 50, cantidad: undefined },
		{ denomination: 20, cantidad: undefined },
		{ denomination: 10, cantidad: undefined },
		{ denomination: 5, cantidad: undefined },
	]);

	const costoTotal = () => {
    let total = 0
    bills.map((item)=>{
      if (item.cantidad!==undefined&&!Number.isNaN(item.cantidad)){
        total+=item.denomination*item.cantidad
      }   
    })
    setMoney(Number.isNaN(total)? 0: total)
    return Number.isNaN(total)? 0: total
  };


	return (
		<div
			className="z-50 w-[100vw] h-[100vh] fixed top-0 flex backdrop-brightness-50 place-items-center"
		>

			<Table className="bg-slate-100 rounded-lg min-w-[412px] top-20 h-[auto] w-[80%] md:w-[50%] overflow-clip fixed left-[10%] md:left-[25%]">
				<TableCaption className="text-white">
					Calculadora de billetes
				</TableCaption>
				<TableHeader>
					<TableRow className="text-lg h-[50px]">
						<TableHead className="" align="center">
							Denominaciones
						</TableHead>
						<TableHead className="text-center">Cantidad</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bills.map((item) => (
						<TableRow key={item.denomination}>
							<TableCell className="font-medium pl-4">
								{item.denomination}
							</TableCell>
							<TableCell className="flex justify-center">
								{" "}
								<input
									type="number"
									className="w-16 text-center border border-gray-300 outline-none rounded-lg no-arrows"
									step="1"
									value={item.cantidad}
									onChange={(e) => {
										item.cantidad = Number.parseFloat(e.target.value);
										setBills([...bills]);
                    costoTotal()
									}}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={1}>Total</TableCell>
						<TableCell className="text-center" align="center">${money}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2} className="flex justify-end">
							<Button
								onClick={() => {
									handleCalculadora();
								}}
								className="text-white"
								type="button"
                variant="destructive"
							>
								Salir
							</Button>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
