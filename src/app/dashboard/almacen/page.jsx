import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {

	return (
		<div className="w-[80%] ml-[20%] max-lg:h-auto h-auto bg-slate-100 text-black user-select-none">
			<div className="h-[50px] w-[98%] mx-[1%] mt-4 bg-white flex place-items-center px-5 user-select-none shadow-md rounded-md font-semibold justify-between">
				<h1 className="text-xl">Warehouse Management</h1>

      </div>
			<div className="h-[auto] w-[98%] pb-32 mt-4 grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 px-5 shadow-md rounded-md font-semibold">
         <Table>
          <TableCaption>Warehouse products</TableCaption>
          <TableHeader>
            <TableHead>

            </TableHead>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                
              </TableCell>
            </TableRow>
          </TableBody>
         </Table>
      </div>

    </div>
	);
}
