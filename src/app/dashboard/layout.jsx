"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import links from "../links.json";
import { usePathname } from "next/navigation";
import { SessionProvider} from "next-auth/react";
import Session from "@/components/Session";

export default function Dashboard_Layout({ children }) {
	const pathName = usePathname();

	return (
		<SessionProvider>
			<div className="flex static">
				<div className="h-[100vh] w-[20%] min-w-[70px] bg-white pt-[20px] px-3 border-r-4 rounded-r fixed md:sidebar-folded ">
					<Image src="/next.svg" width={150} height={38} alt="logo" />
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
					<Session/>
				</div>
				{children}
			</div>
		</SessionProvider>
	);
}
