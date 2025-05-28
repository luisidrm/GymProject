'use client';

import axios from "axios";

export default function Dashboard() {

	// const deleteAll = async()=>{
	// 	await axios.delete('http://localhost:3000/api/createClients')
	// }

	
		return (
			<div className="w-[80%] ml-[20%] max-lg:h-auto h-[100vh] bg-slate-100 text-black user-select-none">
				<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
					<h1  className="text-xl">Main Dashboard</h1>
				</div>
			</div>
		);
	} 
	

