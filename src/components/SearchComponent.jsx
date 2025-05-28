"use client";

import axios from "axios";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export default function SearchComponent({
	placeholder,
	isSearching,
	setIsSearching,
	foundElements,
	setFoundElements,
}) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const { replace } = useRouter();

	const handleSearch = async (term) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("search", term);
			setIsSearching(true);
		} else {
			params.delete("search");
			setIsSearching(false);
			setFoundElements([]);
		}
		replace(`${pathName}?${params.toString()}`);
		await axios
			.get(`/api/search?search=${term}`)
			.then((response) => {
					setFoundElements(response.data);
			})
			.catch((error) => {
				console.error("Error during search:", error);
			});
	};
	return (
		<div className="h-[25px] w-[60%] flex justify-center">
			<input
				type="text"
				className="w-full h-[100%] shadow-md rounded-md p-4 pl-6  border-none outline-none focus:outline-slate-600 focus:outline-2"
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("search")?.toString()}
				placeholder={placeholder}
			/>
		</div>
	);
}
