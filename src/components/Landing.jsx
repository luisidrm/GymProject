"use client";

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
  background: linear-gradient(to bottom, #155843, #fff);
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
  font-size: 4rem;
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
	products,
	reservation,
	setReservation,
	sendData,
}) {
	return (
		<Container>
			{/* Hero Section */}
			<Hero>
				<Title>RAY Pool Bar</Title>
					<Subtitle className="px-6 font-thin text-lg flex justify-center  text-center text-white">
						Haz tu reserva y juega hoy mismo con tus amigos y familiares
						asdasdasdasdasdasdasdasdasdadasdsad ashdahjkhjhasddsaj asdaklsjdlkj
						aslkdjalkjsd alkjsdalkjda asjdjkasjh akjsdhkjhasd kjashdkjasdh
					</Subtitle>
				<CTAButton
					className="bg-transparent text-white px-[2em] py-[15px] text-lg font-semibold rounded-none border-b-2 border-white"
					href="#reserve"
				>
					Reserva Ya!
				</CTAButton>
				<CTAButton
					href="#menu"
					size="lg"
					className="text-white font-semibold text-xl py-[15px] px-[2em] mt-4 hover:border-b-2 hover:border-white rounded-none"
				>
					Nuestra Oferta
				</CTAButton>
				<div className="w-[100%] bg-transparent flex justify-center">
					<Link
						className="text-white font-thin text-lg py-[5px] px-[1em] mt-4 hover:border-b-2 hover:border-white rounded-none"
						href={""}
					>
						Whatsapp
					</Link>
					<Link
						className="text-white text-lg font-thin py-[5px] px-[1em] mt-4 hover:border-b-2 hover:border-white rounded-none"
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
						className="hover:text-blue-500 text-white cursor-pointer"
						href={"https://maps.app.goo.gl/TqSxaFfkEsL3xL7n8"}
					>
						{" "}
						Nos encontramos en #313 calle Celestina Quintero e/ Central y Cabo
						Brito.
					</Link>
					RAY Pool Bar no es un negocio es una experiencia.
				</p>
			</Section>

			{/* Menu Highlights */}
			<Section bg="#f3faff">
				<h2>Recomended Drinks</h2>
				<Cards>
					{products.map((prod) => (
						<Card key={prod.id} className="bg-white">
							<Image
								className="flex justify-center m-5 place-items-center"
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
			<Section>
				<h2 id="reserve" className="text-2xl">
					Reserva tu tiempo
				</h2>
				<p>Completa el formulario y te recibiremos cuando quieras</p>
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
						placeholder="Peticiones Especiales??"
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
	backgroundColor: "#00aaff",
	color: "#fff",
	border: "none",
	cursor: "pointer",
	fontWeight: "bold",
	transition: "background 0.2s",
	marginTop: "1em",
};
