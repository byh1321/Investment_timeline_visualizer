import { HorizontalTimeline } from "@/components/horizontal-timeline"
import { Investment } from "@/types/investment"
import "./App.css"

const mockInvestments: Investment[] = [
    {
        id: "1",
        date: new Date(2026, 4, 15), // May 15
        type: "buy",
        category: "stock",
        amount: 1000000,
        description: "삼성전자 매수",
    },
    {
        id: "2",
        date: new Date(2026, 5, 10), // Jun 10
        type: "buy",
        category: "overseas",
        amount: 2500000,
        description: "Apple Buy",
    },
    {
        id: "3",
        date: new Date(2026, 6, 20), // Jul 20
        type: "sell",
        category: "crypto",
        amount: 1200000,
        description: "Bitcoin Sell",
    },
    {
        id: "4",
        date: new Date(2026, 7, 5), // Aug 5
        type: "buy",
        category: "cash",
        amount: 500000,
        description: "상여금 입금",
    },
    {
        id: "5",
        date: new Date(2026, 8, 1), // Sep 1
        type: "buy",
        category: "stock",
        amount: 800000,
        description: "SK하이닉스 매수",
    },
]

function App() {
    return (
        <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
            <header className="p-4 border-b bg-card flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Investment Timeline 📈</h1>
                <div className="text-sm text-muted-foreground">
                    Visualizing your financial journey
                </div>
            </header>
            <main className="flex-1 overflow-hidden">
                <HorizontalTimeline investments={mockInvestments} />
            </main>
        </div>
    )
}

export default App
