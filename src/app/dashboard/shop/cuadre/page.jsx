"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("http://localhost:3000/api/cuadre")
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => {

				});
		};
		fetchData();
	}, []);

	return (
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-[100%] min-h-[100vh] bg-slate-100 text-black user-select-none">
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between ">
				<h1 className="xl:text-xl md:text-lg">Sales Management</h1>
			</div>
			<div className="h-[auto] w-[98%] pb-32 mt-4 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 px-5 shadow-md rounded-md font-semibold">
				
			</div>
		</div>
	);
}
