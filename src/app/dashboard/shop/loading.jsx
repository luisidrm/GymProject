"use client";

export default function Loading() {
	return (
		<div className="w-[100%] min-w-[250px] h-auto bg-white rounded-md shadow-md mt-4 border animate-pulse">
			<div className="flex justify-center">
				<div className="m-5 h-60 w-[200px] bg-gray-300 rounded-md" />
			</div>

			<div className="ml-4">
				<div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
				<div className="h-4 w-5/6 bg-gray-200 rounded" />
			</div>

			<div className="ml-4 mb-2 mt-3 flex justify-between items-center">
				<div className="h-6 w-16 bg-gray-300 rounded" />
				<div className="flex gap-2">
					<div className="w-10 h-8 rounded-md bg-gray-400" />
					<div className="w-10 h-8 rounded-md bg-red-400" />
				</div>
			</div>
		</div>
	);
}
