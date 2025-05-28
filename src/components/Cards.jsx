import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Cards({newSubs, data, activeMembers, netSales}) {
  
  const netIncome = ()=>{
    let total = 0
    data.map((data)=>{
      total = total + Number.parseFloat(data.sum)
    })
    return Number.parseFloat(total)
  }

  return (
    <div className="*:data-[slot=card]:shadow-xs grid-cols-1 sm:grid-cols-2 @5xl/main:grid-cols-4 grid mt-5
    xl:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Net Payments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${netIncome()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Examinated Yearly 
          </div>
          <div className="text-muted-foreground">
            Income of membership Payments
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Net Sales</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            ${netSales}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Examinate Yearly 
          </div>
          <div className="text-muted-foreground">Net value of store section </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            +{newSubs}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Examinated current month 
          </div>
          <div className="text-muted-foreground">
            New customers signed in 
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Members</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {activeMembers}
          </CardTitle>

        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active Members as of today 
          </div>
          <div className="text-muted-foreground">Steady bussines development</div>
        </CardFooter>
      </Card>
    </div>
  )
}
