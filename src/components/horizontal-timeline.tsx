"use client"

import React from "react"
import { useRef, useState, useEffect } from "react"
import { Investment, categories } from "@/types/investment"
import { InvestmentCard } from "./investment-card"

interface HorizontalTimelineProps {
    investments: Investment[]
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function HorizontalTimeline({ investments }: HorizontalTimelineProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            setMaxScroll(container.scrollWidth - container.clientWidth)
        }
    }, [investments])

    const handleScroll = () => {
        const container = scrollContainerRef.current
        if (container) {
            setScrollPosition(container.scrollLeft)
            setMaxScroll(container.scrollWidth - container.clientWidth)
        }
    }

    const handleScrollbarDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = scrollContainerRef.current
        const scrollbar = e.currentTarget
        if (!container || !scrollbar) return

        const rect = scrollbar.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = x / rect.width
        container.scrollLeft = percentage * maxScroll
    }

    const getMonthPosition = (date: Date): number => {
        // Basic calculation for visibility in the May-Sep range provided in the original code
        const startMonth = 4 // May (0-indexed)
        const monthDiff = date.getMonth() - startMonth
        const dayPercentage = date.getDate() / 30
        return (monthDiff + dayPercentage) * 200 + 100
    }

    const getInvestmentsByCategory = (categoryId: string) => {
        return investments.filter((inv) => inv.category === categoryId)
    }

    const categoryRowHeight = 120
    const timelineY = 90 // Y position of the main timeline within each category row

    return (
        <div className="flex flex-col h-full w-full bg-background text-foreground">
            {/* Timeline content */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
            >
                <div className="min-w-[1400px] h-full relative px-8 pt-4 pb-8">
                    {/* Category rows */}
                    <div className="flex flex-col">
                        {categories.map((category) => (
                            <div key={category.id} className="relative" style={{ height: `${categoryRowHeight}px` }}>
                                {/* Category label */}
                                <div
                                    className="absolute left-0 font-bold text-foreground z-10 bg-background pr-4"
                                    style={{ top: `${timelineY - 6}px` }}
                                >
                                    {category.nameKo}
                                </div>

                                {/* Horizontal line (thin) */}
                                <div
                                    className="absolute left-16 right-0 h-[2px] bg-foreground/20"
                                    style={{ top: `${timelineY}px` }}
                                />

                                {/* Arrow at the end */}
                                <div
                                    className="absolute right-0"
                                    style={{ top: `${timelineY - 5}px` }}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        className="fill-foreground/40"
                                    >
                                        <polygon points="0,0 12,6 0,12" />
                                    </svg>
                                </div>

                                {/* Investment cards and vertical lines for this category */}
                                {getInvestmentsByCategory(category.id).map((investment) => {
                                    const xPos = getMonthPosition(investment.date) + 64
                                    const cardHeight = 60
                                    const cardTop = 8
                                    const lineColor = investment.type === "buy" ? "bg-green-500" : "bg-red-500"

                                    return (
                                        <div key={investment.id}>
                                            {/* Card */}
                                            <div
                                                className="absolute z-10"
                                                style={{
                                                    left: `${xPos}px`,
                                                    top: `${cardTop}px`,
                                                }}
                                            >
                                                <InvestmentCard investment={investment} />
                                            </div>

                                            {/* Vertical line connecting card to timeline */}
                                            <div
                                                className={`absolute w-[2px] ${lineColor}`}
                                                style={{
                                                    left: `${xPos + 12}px`,
                                                    top: `${cardTop + cardHeight}px`,
                                                    height: `${timelineY - cardTop - cardHeight}px`,
                                                }}
                                            />

                                            {/* Dot on timeline */}
                                            <div
                                                className={`absolute w-3 h-3 rounded-full ${lineColor} z-10`}
                                                style={{
                                                    left: `${xPos + 12 - 5}px`,
                                                    top: `${timelineY - 5}px`,
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        ))}

                        {/* Timeline axis with months - integrated */}
                        <div className="relative h-8 ml-16">
                            {/* Base line */}
                            <div className="absolute left-0 right-12 top-0 h-[1px] bg-muted-foreground/30" />

                            {/* Month markers */}
                            {months.slice(4, 9).map((month, index) => (
                                <div
                                    key={month}
                                    className="absolute flex flex-col items-center"
                                    style={{ left: `${index * 200 + 100}px` }}
                                >
                                    {/* Tick mark */}
                                    <div className="w-[1px] h-2 bg-muted-foreground/50" />
                                    {/* Month label */}
                                    <span className="text-sm text-muted-foreground mt-1">{month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom scrollbar */}
            <div className="h-14 bg-indigo-600 flex items-center px-4 shrink-0 shadow-lg">
                <div className="w-6 flex flex-col justify-center items-center gap-0.5">
                    <div className="w-0.5 h-4 bg-indigo-300/50 rounded" />
                    <div className="w-0.5 h-4 bg-indigo-300/50 rounded" />
                </div>
                <div
                    className="flex-1 h-2 bg-indigo-900/30 rounded-full mx-4 relative cursor-pointer"
                    onClick={handleScrollbarDrag}
                >
                    {/* Scrollbar thumb */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-300 rounded-full shadow-md flex items-center justify-center transition-all hover:bg-white"
                        style={{
                            left: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%`,
                            transform: `translate(-50%, -50%)`,
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            className="fill-indigo-600"
                        >
                            <polygon points="6,4 10,8 6,12" />
                        </svg>
                    </div>
                </div>
                <div className="w-6 flex flex-col justify-center items-center gap-0.5">
                    <div className="w-0.5 h-4 bg-indigo-300/50 rounded" />
                    <div className="w-0.5 h-4 bg-indigo-300/50 rounded" />
                </div>
            </div>
        </div>
    )
}
