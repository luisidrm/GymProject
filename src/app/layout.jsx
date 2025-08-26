"use client";

import { Toaster } from "@/components/ui/toaster";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SearchComponent from "@/components/SearchComponent";
import SocketComponent from "@/components/SocketComponent";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const metadata = {
	title: "Gym Manager",
	description: "You can keep control of your business here",
};

export default function RootLayout({ children }) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/";

	const content = (
		<html lang="en">
			<body className="flex w-full m-0 p-0 overflow-x-hidden ">
				{children}
				<Toaster />
			</body>
		</html>
	);
	useEffect(() => {
		document.title = metadata.title;
	});

	if (isLoginPage) return content;
	return (
		<div className="w-full flex">
			<SocketComponent /> {content}
		</div>
	);
}
