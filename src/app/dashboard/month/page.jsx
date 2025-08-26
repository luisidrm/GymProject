"use client";

import { Cards } from "@/components/Cards";
import axios from "axios";
import { useEffect, useState } from "react";
import {
	Area,
	Bar,
	CartesianGrid,
	BarChart,
	Legend,
	Line,
	ResponsiveContainer,
	Scatter,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function Month() {
	const [data, setData] = useState([]);
	const [newSubs, setNewSubs] = useState();
	const [activeMembers, setActiveMembers] = useState();
	const [netSales, setNetSales] = useState();

	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/month")
				.then((res) => {
					setData(res.data.response);
					setNewSubs(res.data.newSubs);
					setActiveMembers(res.data.activeMembers);
					setNetSales(res.data.yearSales);
				})
				.catch((err) => {
					console.error(err);
				});
		};
		fetchData();
	}, []);

	const obtenerMes = () => {
		const fecha = new Date(); // Obtiene la fecha del dispositivo
		const mes = fecha.getMonth(); // getMonth() devuelve de 0 (Enero) a 11 (Diciembre)
		return months[mes]; // Devuelve el mes en texto
	};

	return (
		<div className="w-full max-lg:h-auto h-[100vh] bg-slate-100 text-black user-select-none">
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between">
				<h1 className="text-xl">Month Results</h1>
				<h2 className="text-slate-500">{obtenerMes()}</h2>
			</div>
			<Cards
				newSubs={newSubs}
				data={data}
				activeMembers={activeMembers}
				netSales={netSales}
			/>
			{/* <div className="w-[30%] h-24 bg-white shadow-md rounded-md font-thin">
					Total Payment
				</div>
				<div className="w-[30%] ml-[2%] h-24 bg-white shadow-md rounded-md font-thin">
					Earnings
				</div>
				<div className="w-[30%] ml-[2%] h-24 bg-white shadow-md rounded-md font-thin">
					Subscriptions
				</div> */}
			<h1 className="text-2xl text-center my-2 font-semibold">
				Payments Income
			</h1>
			<div className="h-[350px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={250}
						height={500}
						data={data}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis dataKey="month" />
						<Tooltip />
						<YAxis />
						<Bar dataKey="sum" barSize={30} fill="#413ea0" radius={4} />
						{/* <Bar dataKey="sum" barSize={40}/> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
