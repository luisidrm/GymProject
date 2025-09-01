import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Session() {
	const { data: session } = useSession();
	return (
		<Link
    href={""}
			className="h-10 w-full absolute flex place-items-center bottom-2 font-thin"
			onClick={() =>
				signOut({
					callbackUrl: "/", // 👈 Redirects here after signout
				})
			}
		>
			<User className="mx-3" />
			<span className="max-md:hidden">{session?.user?.name}</span>
		</Link>
	);
}
