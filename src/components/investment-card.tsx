import { Investment } from "@/types/investment"
import { TrendingUp, TrendingDown } from "lucide-react"

interface InvestmentCardProps {
    investment: Investment
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
    const isBuy = investment.type === "buy"

    return (
        <div className={`
      flex items-center gap-2 p-2 rounded-lg border shadow-sm bg-background
      min-w-[150px] transition-all hover:scale-105 cursor-pointer
      ${isBuy ? 'border-green-500/30' : 'border-red-500/30'}
    `}>
            <div className={`
        p-1.5 rounded-full
        ${isBuy ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}
      `}>
                {isBuy ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate">{investment.description}</span>
                <span className="text-[10px] text-muted-foreground">
                    {investment.amount.toLocaleString()}원
                </span>
            </div>
        </div>
    )
}
