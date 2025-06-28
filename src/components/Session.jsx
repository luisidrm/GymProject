import { User } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link";

export default function Session(){
    const {data: session} = useSession()    
  return(
    <Link className="h-10 w-full absolute flex place-items-center bottom-2 font-thin"
      href={"/api/auth/signout"}
    >
      <User className="mx-3"/>
      <span className="max-md:hidden">{session?.user?.name}</span>
    </Link>
  )
}