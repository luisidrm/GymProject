"use client";

// LandingPage.jsx
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  color: #fff;
  margin: 0.2em 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #e0fbfc;
  margin-bottom: 1.5em;
`;

const CTAButton = styled.a`
  background-color: darkgreen;
  color: white;
  padding: 1em 2em;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
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
export default function LandingPage({ products }) {
	return (
		<Container>
			{/* Hero Section */}
			<Hero>
				<Title>RAY Pool Bar</Title>
				<Subtitle className="px-2 font-thin">
					Haz tu reserva y juega hoy mismo con tus amigos y familiares
				</Subtitle>
				<CTAButton href="#reserve">Reserva Ya!</CTAButton>
			</Hero>

			{/* About Section */}
			<Section>
				<h2>
					<b>Sobre nosotros</b>
				</h2>
				<p className="px-5">
					Somos un negocio que mezcla los conceptos de bar y billar para ofrecer
					una experiencia completa a nuestros clientes.
					<Link className="hover:text-blue-500 cursor-pointer" href={'https://maps.app.goo.gl/TqSxaFfkEsL3xL7n8'}>
						{" "}
						Nos encontramos en #313 calle Celestina Quintero e/ Central y Cabo
						Brito
					</Link>
					. RAY Pool Bar no es un negocio es una experiencia.
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
					<input type="text" placeholder="Tu Nombre" style={inputStyle} />
					<input type="text" placeholder="Tu Telefono" style={inputStyle} />
					<input
						type="text"
						placeholder="Cantidad de Personas"
						style={inputStyle}
					/>
					<input type="date" style={inputStyle} />
					<input
						type="text"
						placeholder="Horario Estimado"
						style={inputStyle}
					/>
					<textarea
						placeholder="Peticiones Especiales"
						style={{ ...inputStyle, height: "100px" }}
					/>
					<button type="submit" style={submitStyle}>
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
