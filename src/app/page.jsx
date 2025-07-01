"use client";
import axios from "axios";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";

export default function Home({ csrfToken }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
			callbackUrl: "/dashboard",
    });

		console.log(res);
		

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      window.location.href = res.url;
    }
  };

	return (
		<div className="w-[100%] h-[100vh] flex flex-col place-items-center justify-center bg-gradient-to-b to-slate-800  from-slate-950 ">
			<Image
				src="/GymLogo.png"
				alt="Logo"
				width={200}
				height={200}
				className="mb-8 w-[200px] h-[200px] absolute top-[6%] rounded-full shadow-md"
			/>
			<div className="lg:w-[30%] md:w-[50%] h-[50%]  bg-transparent w-[80%] shadow-b-xl rounded-md flex flex-col justify-center">
				<h3 className="mb-[20px] text-3xl font-thin text-center text-slate-50">
					Login into your Account
				</h3>
				<form className="flex flex-col place-items-center">
					<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="h-[35px] w-[70%] mx-[15%] text-slate-950 px-5 rounded-md mb-[20px] outline-2 border-none shadow-md outline-slate-400"
						placeholder="Username"
						required
					/>
					<input
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="h-[35px] w-[70%] mx-[15%] text-slate-950 px-5 rounded-md mb-[20px] outline-2 border-none shadow-md outline-slate-400"
						placeholder="Password"
					/>
					<button
					type="button"
						onClick={handleSubmit}
						className="h-[35px] w-[70%] font-normal hover:bg-slate-200 flex justify-center text-center place-items-center bg-slate-500 mx-[20%] px-5 rounded-md mb-[10px] outline-2 border-none shadow-md outline-slate-400"
					>
						<span className="mr-1">Sign in</span>
						<LogIn/>
					</button>
					{error && <p className="text-red-700 font-medium">{error}</p>}
				</form>
			</div>
		</div>
	);
}

Home.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};
