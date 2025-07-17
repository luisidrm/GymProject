"use client";

import { ArrowBigDown } from "lucide-react";
// LandingPage.jsx
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Facebook } from "react-content-loader";
import styled from "styled-components";

// ---- Styled Components ----
const Container = styled.div`
  font-family: 'Helvetica', Tahoma, Geneva, Verdana, sans-serif;
  color: #003049;
  margin: 0;
  padding: 0;
  
`;

const Hero = styled.section`
  height: 90vh;
  background: url('https://source.unsplash.com/1600x900/?pool,bar') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.4);
`;

const Title = styled.h1`
	font-weight: 600;
  color: #fff;
  margin: 0.2em 0;
`;

const Subtitle = styled.p`
`;

const CTAButton = styled.a`
`;

const Section = styled.section`
  padding: 4em 2em;
  background: ${({ bg }) => bg || "#fff"};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2em;
  width: 100%;
  max-width: 1000px;
  margin-top: 2em;
`;

const Card = styled.div`
  border-radius: 12px;
  padding: 2em;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

// ---- Component ----
export default function LandingPage({
	recomended,
	products,
	reservation,
	setReservation,
	sendData,
}) {
	return (
		<Container id="home" className="bg-emerald-950">
			{/* Hero Section */}
			<Hero>
				<Title className="xl:text-6xl text-5xl">RAY Pool Bar</Title>
				<Subtitle className="px-6 mb-3 font-thin text-lg flex justify-center  text-center text-white">
					El mejor billar en tu zona. Ofrecemos servicio de 12pm a 12am con una
					oferta variada y con precios competitivos para compartir un buen rato
					con tus amigos y familiares. Aqui obtendras informacion sobre todos
					nuestros servicios
				</Subtitle>
				<div className="flex justify-center h-16 mb-8 gap-3">
					<CTAButton
						className="bg-emerald-950 flex place-items-center  text-white px-[2em] py-[15px] text-lg font-semibold rounded-lg border-2  hover:scale-110 border-white"
						href="#reserve"
					>
						<ArrowBigDown /> Reserva Ya!
					</CTAButton>
					<CTAButton
						href="#menu"
						size="lg"
						className="text-white font-semibold text-xl py-[15px] px-[1em] border-2 border-white rounded-lg hover:scale-110"
					>
						Oferta
					</CTAButton>
				</div>
				<h1 className="text-white text-xl">
					<b>Contactanos:</b>
				</h1>
				<div className="w-[100%] bg-transparent flex justify-center">
					<Link
						className="text-white font-thin text-lg py-[3px] border-b-2 border-transparent px-[1em] mt-4 hover:border-b-2 rounded-lg hover:border-white "
						href={""}
					>
						Whatsapp
					</Link>
					<Link
						className="text-white text-lg font-thin py-[5px] border-b-2 border-transparent px-[1em] mt-4 hover:border-b-2 hover:border-white rounded-lg"
						href={""}
					>
						Facebook
					</Link>
				</div>
			</Hero>

			{/* About Section */}
			<Section>
				<h2>
					<b>Sobre nosotros</b>
				</h2>
				<p className="px-5">
					Somos un negocio que mezcla los conceptos de bar y billar para ofrecer
					una experiencia completa a nuestros clientes.
					<Link
						target="_blank"
						className="hover:text-blue-500 text-black cursor-pointer"
						href={"https://maps.app.goo.gl/TqSxaFfkEsL3xL7n8"}
					>
						{" "}
						Nos encontramos en #313 calle Celestina Quintero e/ Central y Cabo
						Brito.
					</Link>{" "}
					RAY Pool Bar no es un negocio es una experiencia.
				</p>
			</Section>

			{/* Menu Highlights */}
			<Section bg="#dbeafe" className="bg-blue">
				<h2>
					<b>Bebidas Recomendadas</b>
				</h2>
				<Cards>
					{recomended.map((prod) => (
						<Card key={prod.id} className="bg-white">
							<Image
								className="flex justify-center m-5 place-items-center place-self-center h-60 object-cover"
								src={prod.picture}
								alt={prod.nombre}
								width={200}
								height={100}
							/>
							<h3 className="font-semibold mb-1">{prod.nombre}</h3>
							<p className="font-thin text-slate-500">{prod.description}</p>
							<p className="font-semibold mt-2">${prod.venta}</p>
						</Card>
					))}
				</Cards>
			</Section>

			{/* Contact / Reservation */}
			<Section id="home" bg="#1e1b4b">
				<h2 id="reserve" className="text-2xl text-white">
					Reserva tu tiempo
				</h2>
				<p className="text-white">
					Completa el formulario y te recibiremos cuando quieras
				</p>
				<form style={{ maxWidth: "500px", width: "100%", marginTop: "1em" }}>
					<input
						type="text"
						placeholder="Tu Nombre"
						style={inputStyle}
						value={reservation.nombre}
						onChange={(e) =>
							setReservation({ ...reservation, nombre: e.target.value })
						}
					/>
					<input
						type="text"
						placeholder="Tu Telefono"
						style={inputStyle}
						value={reservation.numero}
						onChange={(e) =>
							setReservation({ ...reservation, numero: e.target.value })
						}
					/>
					<input
						type="number"
						placeholder="Cantidad de Personas"
						style={inputStyle}
						value={reservation.cantidad}
						onChange={(e) =>
							setReservation({
								...reservation,
								cantidad: Number.parseInt(e.target.value),
							})
						}
					/>
					<input
						type="date"
						style={inputStyle}
						value={reservation.fecha}
						onChange={(e) =>
							setReservation({ ...reservation, fecha: e.target.value })
						}
					/>
					<input
						type="text"
						placeholder="Horario Estimado"
						style={inputStyle}
						value={reservation.horario}
						onChange={(e) =>
							setReservation({ ...reservation, horario: e.target.value })
						}
					/>
					<textarea
						placeholder="Peticiones Especiales?? Si deseas algun tipo de decoracion en el local para tu reservacion o realizar un pedido de antemano"
						style={{ ...inputStyle, height: "100px" }}
						maxLength={150}
						value={reservation.especial}
						onChange={(e) =>
							setReservation({ ...reservation, especial: e.target.value })
						}
					/>
					<button type="button" onClick={sendData} style={submitStyle}>
						Enviar Reservación
					</button>
				</form>
			</Section>

			{/* Footer */}
		</Container>
	);
}

// ---- Inline Styles for Form ----
const inputStyle = {
	width: "100%",
	padding: "0.8em 1em",
	margin: "0.5em 0",
	borderRadius: "8px",
	border: "1px solid #ccc",
	fontSize: "1rem",
};

const submitStyle = {
	...inputStyle,
	backgroundColor: "#4338ca",
	color: "#fff",
	border: "none",
	cursor: "pointer",
	fontWeight: "bold",
	transition: "background 0.2s",
	marginTop: "1em",
};
