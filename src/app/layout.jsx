"use client";

import { Toaster } from "@/components/ui/toaster";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
// 	title: "Gym Manager",
// 	description: "You can keep control of your business here",
// };

export default function RootLayout({ children }) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/";

	const content = (
		<html lang="en">
			<body>{children}
				<Toaster/>
			</body>
		</html>
	);
	if (isLoginPage) return content;
	return <div>{content}</div>;
}
