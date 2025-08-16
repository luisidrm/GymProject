"use client";
import Calculadora from "@/components/Calculadora";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Calculator } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Page() {
	const [data, setData] = useState([]);
	const [calculadora, setCalculadora] = useState(false);
	const [money, setMoney] = useState();

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/cuadre")
				.then((res) => {
					setData(res.data.cuadreFull);
				})
				.catch((err) => {});
		};
		fetchData();
	}, []);

	const handleCalculadora = () => {
		setCalculadora(!calculadora);
	};

	  const ventasBrutas = data.reduce(
    (acc, v) => acc + v.venta * v._sum.cantidad,
    0
  );

  const costoTotal = data.reduce(
    (acc, v) => acc + v.compra??0 * v._sum.cantidad,
    0
  );

  const utilidadBruta = ventasBrutas - costoTotal;

  const margenBruto = ventasBrutas > 0
    ? (utilidadBruta / ventasBrutas) * 100
    : 0;

  // const productosVendidos = ventas.reduce((acc, v) => acc + v.cantidad, 0);
	console.log(calculadora);
	return (
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-[100%] min-h-[100vh] bg-slate-100 text-black user-select-none">
			{calculadora && (
				<Calculadora
					calculadora={calculadora}
					handleCalculadora={handleCalculadora}
					money={money}
					setMoney={setMoney}
				/>
			)}
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 mb-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between ">
				<h1 className="xl:text-xl md:text-lg">Sales Management</h1>
				<div className="flex justify-center w-auto gap-1 place-items-center">
					<h2 className="font-light">${money ?? 0}</h2>
					<Button
						className="bg-transparent hover:bg-transparent shadow-none h-full "
						onClick={handleCalculadora}
					>
						<Calculator className="stroke-slate-700" size={24} />
					</Button>
				</div>
			</div>
			<h1 className="h-[50px] text-center font-semibold text-lg">Principales Indicadores</h1>
			<div className="h-auto w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid mx-[0.5%] mb-4">
				<Card className="@container/card">
					<CardHeader className="relative">
						<CardDescription>Ventas Brutas</CardDescription>
						<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
							${ventasBrutas}
						</CardTitle>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1 text-sm">
						<div className="line-clamp-1 flex gap-2 font-medium">
							Examinado en tiempo real
						</div>
						<div className="text-muted-foreground">
							Entrada por ventas de productos
						</div>
					</CardFooter>
				</Card>
				      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Costo Total</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${costoTotal}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Examinate Yearly 
          </div>
          <div className="text-muted-foreground">Net value of store section </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Utilidad Bruta</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {utilidadBruta}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Examinated current month 
          </div>
          <div className="text-muted-foreground">
            New customers signed in 
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Margen Bruto</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {margenBruto.toFixed(2)}%
          </CardTitle>

        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active Members as of today 
          </div>
          <div className="text-muted-foreground">Steady bussines development</div>
        </CardFooter>
      </Card>
			</div>
			<h1 className="h-[50px] text-center font-semibold text-lg">Desglose por producto</h1>
			<div className="h-[auto] w-[98%] pb-32 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 pl-5 shadow-md rounded-md font-semibold">
				{data.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-sm shadow-sm flex p-3 w-full"
					>
						<Image
							src={item.picture}
							alt={item.producto}
							width={200}
							height={200}
							className="w-24 h-24 rounded-full object-contain place items-center shadow-lg"
						/>
						<div className="pl-2">
							<h1 className="font-medium">{item.producto}</h1>
							{item.compra && (
								<p className="text-sm font-thin">
									Precio de Compra: {item.compra}
								</p>
							)}
							<p className="text-sm font-thin">
								Precio de Venta: ${item.venta}
							</p>
							<p className="text-sm font-thin">
								Cantidad Vendida: {item._sum.cantidad}
							</p>
							<p className="text-sm font-thin">Dinero: $ {item._sum.total}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
