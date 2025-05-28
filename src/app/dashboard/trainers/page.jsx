"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import { AlertDialogDemo } from "@/components/AlertDialog";

export default function Page() {
	const router = useRouter();

	const [data, setData] = useState([]);
	const [imageSrc, setImageSrc] = useState("/avatar-trainer.svg");
	const [info, setInfo] = useState({
		picture: imageSrc,
		nombre: "",
		ci: "",
		schedule: "",
		phone: "",
		entrenados: 0,
	});
	const [elim, setElim] = useState(false);
	const [element, setElement] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/trainers");
				setData(response.data.trainers);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const createTrainer = async () => {
		try {
			const response = await axios.post("http://localhost:3000/api/trainers", {
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				},
				data: {
					info,
				},
			});
			alert(response.data.message);
			router.push("/dashboard/trainers");
		} catch (error) {
			alert("Error al agregar Entrenador");
		}
	};

	const handleImageChange = (e) => {
		const [file] = imgInp.files;
		if (file) {
			blah.src = URL.createObjectURL(file);
			setInfo({ ...info, picture: blah.src });
		}
	};

	const handleDelete = (e, element) => {
		e.preventDefault();
		setElement(element);
		setElim(!elim);
	};

	const deleteTrainer = async (element) => {
		await axios
			.delete("http://localhost:3000/api/trainers", {
				data: {
					id_entrenador: element.id_entrenador,
				},
			})
			.then((res) => {
				alert(res.message);
				setRefresh(!refresh);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	console.log(info);

	return (
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-auto bg-slate-100 text-black user-select-none">
      <AlertDialogDemo
        elim={elim}
        handleDelete={handleDelete}
        deleteProd={deleteTrainer}
        element={element}
      />

			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1 className="text-xl">Trainer's Information</h1>
			</div>
			<div className="h-[auto] pb-10 w-[98%] user-select-none mx-[1%] gap-[2%] mt-5 bg-slate-100 shadow-md rounded-lg grid md:grid-cols-2 grid-cols-1">
				{data.map((trainer) => (
					<div
						onContextMenu={(e) => handleDelete(e, trainer)}
						className="h-auto w-[100%] p-5 px-5 border-b-2 border-r-2 rounded-lg mt-2 bg-white border-slate-950"
						key={trainer.id_entrenador}
					>
						<div className="flex place-items-center mb-2 justify-between">
							<div className="flex place-items-center">
								<Image
									src="/avatar-trainer.svg"
									width={50}
									height={50}
									alt={trainer.nombre}
									className="rounded-xl"
								/>
								<div className="block">
									<h3 className="ml-4">{trainer.nombre} </h3>
									<h3 className=" ml-4 text-slate-400 text-sm">{trainer.ci}</h3>
								</div>
							</div>
						</div>
						<hr className="mb-1" />
						<div className="flex text-sm bg-slate-100 text-slate-500 rounded-md">
							<div className=" pl-3">
								<h3 className="">Horario: {trainer.horario}</h3>
								<h3 className="">Telefono: {trainer.telefono}</h3>
							</div>
							<div className="pl-3">
								<h3 className="">
									Cantidad de Entrenados: {trainer.entrenados}
								</h3>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-center">
				<h1>Agregar Entrenador</h1>
			</div>
			<div className="h-[auto] w-[98%] user-select-none mx-[1%] mt-5 bg-slate-100 shadow-md rounded-lg">
				<form className="align-middle text-center items-center p-12  bg-white w-[100%]">
					<div className=" md:flex md:flex-row flex flex-col">
						<div className="md:w-[50%] w-[100%] flex flex-col">
							<label htmlFor="imgInp">
								<Image
									className="max-h-[100px] max-w-[100px] rounded-xl mb-5"
									id="blah"
									src={imageSrc}
									alt="avatar+.svg"
									width={280}
									height={100}
								/>
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									id="imgInp"
									// onChange={(e)=>{setInfo({...info, picture: e.target.value})}}
									className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
								/>
							</label>
						</div>
						<div className="md:w-[50%] w-[100%] flex flex-col">
							<input
								value={info.nombre}
								name="foto"
								onChange={(e) => {
									setInfo({ ...info, nombre: e.target.value });
								}}
								className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
								placeholder="Nombre"
								type="text"
							/>
							<input
								value={info.ci}
								onChange={(e) => setInfo({ ...info, ci: e.target.value })}
								className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
								placeholder="Carnet"
								type="text"
								name="carnet"
							/>
							<input
								value={info.schedule}
								onChange={(e) => setInfo({ ...info, schedule: e.target.value })}
								className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
								placeholder="Horario"
								type="text"
								name="schedule"
							/>
							<input
								value={info.phone}
								onChange={(e) => setInfo({ ...info, phone: e.target.value })}
								className="mb-6 w-[90%] h-[35px] px-4 shadow-md rounded-md border-none outline-none focus:outline-2 focus:outline-slate-500"
								placeholder="Telefono"
								type="text"
								name="phone"
							/>
						</div>
					</div>
					<div className="block gap-">
						<button
							type="button"
							onClick={() => createTrainer()}
							className="bg-slate-900 px-16 py-3 rounded-md shadow-md mr-10 text-white "
						>
							Agregar Entrenador
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
