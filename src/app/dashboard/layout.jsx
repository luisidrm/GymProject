"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import links from "../links.json";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Session from "@/components/Session";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ArrowBigRightDashIcon } from "lucide-react";

export default function Dashboard_Layout({ children }) {
	const [open, setOpen] = useState(false);

	const [vertical, setVertical] = useState(40);
	const dragging = useRef(false);

	const startDrag = (e) => {
		dragging.current = true;
		document.addEventListener("mousemove", onDrag);
		document.addEventListener("mouseup", stopDrag);
		document.addEventListener("touchmove", onDragTouch);
		document.addEventListener("touchend", stopDrag);
	};

	const onDrag = (e) => {
		if (!dragging.current) return;
		setVertical(e.clientY + 24);
	};

	const onDragTouch = (e) => {
		if (!dragging.current) return;
		const touch = e.touches[0];
		setVertical(touch.clientY + 24);
	};

	const stopDrag = () => {
		dragging.current = false;
		document.removeEventListener("mousemove", onDrag);
		document.removeEventListener("mouseup", stopDrag);
		document.removeEventListener("touchmove", onDragTouch);
		document.removeEventListener("touchend", stopDrag);
	};

	const pathName = usePathname();

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<SessionProvider>
			<div className="flex w-full">
				{open ? (
					<div
						id="1"
						className={`h-[100vh] w-[20%] min-w-[70px] m-0 bg-white pt-[20px] px-3 rounded-r fixed shadow-lg z-50
					 md:sidebar-folded `}
					>
						<Image
							src="/next.svg"
							width={150}
							height={38}
							alt="logo"
							onClick={handleOpen}
						/>
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
										onClick={handleOpen}
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
				) : (
					<Button
					style={{
						top: vertical,
					}}
						onClick={handleOpen}
						onMouseDown={startDrag}
						onTouchStart={startDrag}
						className='fixed z-30 h-12 w-12 rounded-r-full'
					>
						<ArrowBigRight />
					</Button>
				)}
				{children}
			</div>
		</SessionProvider>
	);
}
