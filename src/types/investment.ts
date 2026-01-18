export type InvestmentType = "buy" | "sell"

export interface Investment {
    id: string
    date: Date
    type: InvestmentType
    category: string
    amount: number
    description: string
}

export interface Category {
    id: string
    nameKo: string
}

export const categories: Category[] = [
    { id: "stock", nameKo: "국내주식" },
    { id: "overseas", nameKo: "해외주식" },
    { id: "crypto", nameKo: "가상화폐" },
    { id: "cash", nameKo: "현금" },
]
