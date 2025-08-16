"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import links from "../links.json";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Session from "@/components/Session";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDashIcon } from "lucide-react";

export default function Dashboard_Layout({ children }) {
	const [open, setOpen] = useState(false)
	const pathName = usePathname();

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<SessionProvider>
			<div className="flex static">
					<div className={`h-[100vh] w-[20%] min-w-[70px] m-0 bg-white pt-[20px] px-3 rounded-r 
					fixed md:sidebar-folded `}>
						<Image src="/next.svg" width={150} height={38} alt="logo" onClick={handleOpen} />
						<ul className="h-auto w-[100%] mt-10">
							{links.map((link) => (
								<li className="h-auto w-[100%] mb-5" key={link.name}>
									<Link
										className={
											link.url === pathName
												? "h-auto max-md:justify-center w-[100%] text-black flex place-items-center rounded-md bg-slate-200"
												: "h-auto w-[100%] max-md:justify-center text-black flex place-items-center"
										}
										href={link.url}
									>
										<Image
											src={link.icon}
											alt={link.name}
											width={25}
											height={25}
										/>
										<h3 className="ml-5 max-md:hidden">{link.name}</h3>
									</Link>
								</li>
							))}
						</ul>
						<Session />
					</div>
				{children}
			</div>
		</SessionProvider>
	);
}
