"use client"

import { useState, useEffect } from "react"
import { EquifaxSVG } from "../svg/EquifaxSVG"
import { ExperianSVG } from "../svg/ExperianSVG"
import { TransUnionSVG } from "../svg/TransUnionSVG"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"
import { useAppStore } from "@/store/useAppStore"
const GaugeComponent = dynamic(() => import("react-gauge-component"), { ssr: false })

export function ScoreGauges({ data }) {
	const currentUserId = useAppStore((state) => state.currentUserId)
	const isLoading = useAppStore((state) => state.isLoading)

	const handleIntroAnimation = () => {
		setTimeout(() => {}, 3000)
	}

	function generateRandomBaseScore() {
		return Math.floor(Math.random() * (851 - 300) + 300)
	}

	function generateRealisticScore(baseScore) {
		const scoreMargin = 10
		const minScore = baseScore - scoreMargin
		const maxScore = baseScore + scoreMargin

		return Math.floor(Math.random() * (maxScore - minScore + 1) + minScore)
	}

	const baseScore = generateRandomBaseScore()

	const profileScores = {
		transUnion: {
			score: generateRealisticScore(baseScore),
		},
		experian: {
			score: generateRealisticScore(baseScore),
		},
		equifax: {
			score: generateRealisticScore(baseScore),
		},
	}

	const client = {
		profileScores: {
			...profileScores,
		},
		...data[currentUserId],
	}

	const creditRanges = [
		{ min: 300, max: 579, label: "Poor Credit" },
		{ min: 580, max: 669, label: "Fair Credit" },
		{ min: 670, max: 739, label: "Good Credit" },
		{ min: 740, max: 799, label: "Very Good Credit" },
		{ min: 800, max: 850, label: "Excellent Credit" },
	]

	const getCreditRange = (creditScore: number) => {
		const range = creditRanges.find((range) => creditScore >= range.min && creditScore <= range.max)
		return range ? range.label : "Invalid credit score"
	}

	const formatCreditScore = (value) => {
		const min = 300
		const max = 850
		const mappedValue = Math.round(((value - min) / (max - min)) * 100)
		return mappedValue < 50 ? mappedValue + 5 : mappedValue - 5
	}

	const [creditScore, setCreditScore] = useState(800)
	const [gaugeValue, setGaugeValue] = useState(null)

	const gaugeOptions = {
		value: formatCreditScore(null),
		type: "semicircle",
		arc: {
			colorArray: ["#ff6364", "#ff883b", "#fcd52d", "#0092f5", "#3fd796"],
			subArcs: [{ limit: 45 }, { limit: 60 }, { limit: 75 }, { limit: 85 }, { limit: 100 }],
			padding: 0.035,
			width: 0.15,
			cornerRadius: 3,
		},
		labels: {
			valueLabel: {
				formatTextValue: () => null + " pts",
				style: { fontSize: "45px", fontWeight: "bold", textShadow: "none" },
				matchColorWithArc: true,
			},
			markLabel: {
				hideMinMax: true,
			},
		},
		pointer: {
			type: "blob",
			width: 20,
			// animate: false,
		},
	}

	const createGaugeOptions = (score: number, bureau: string) => {
		return {
			...gaugeOptions,
			value: formatCreditScore(score),
			labels: {
				valueLabel: {
					...gaugeOptions.labels.valueLabel,
					formatTextValue: () => score + " pts",
				},
				markLabel: gaugeOptions.labels.markLabel,
			},
		}
	}

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		const options = { month: "short", day: "numeric", year: "numeric" }
		const formattedDate = date.toLocaleDateString("en-US", options)
		return "Last updated: " + formattedDate
	}

	const bureaus = [
		{
			name: "TransUnion",
			svgComponent: <TransUnionSVG />,
			clientScore: client.profileScores.transUnion.score,
		},
		{
			name: "Experian",
			svgComponent: <ExperianSVG />,
			clientScore: client.profileScores.experian.score,
		},
		{
			name: "Equifax",
			svgComponent: <EquifaxSVG />,
			clientScore: client.profileScores.equifax.score,
		},
	]

	return (
		!isLoading && (
			<>
				<h1 className={`h-10 text-3xl ${currentUserId !== null ? null : "w-80 animate-pulse rounded-md bg-white/10 text-transparent"}`}>{`${client.firstName} ${client.lastName}`}</h1>
				<div className="grid h-auto grid-cols-3 gap-5">
					{bureaus.map((bureau) => (
						<div key={bureau.name} className="flex flex-col items-center [&>:first-child]:-mb-4">
							<div className={`relative flex w-full justify-center ${currentUserId !== null ? null : "relative top-3 [&>svg]:h-8 [&>svg]:rounded-md [&>svg]:bg-white/10 [&>svg]:opacity-0"}`}>
								{currentUserId === null && <div className={`absolute inset-0 inset-x-10 animate-pulse rounded-md bg-white/10 `}></div>}
								{bureau.svgComponent}
							</div>
							<div className={`h-36 w-full`}>
								{currentUserId === null ? (
									<div className="relative h-36 w-full">
										<div className="absolute left-[34px] top-10 my-auto h-20 w-[70%] scale-95 animate-pulse rounded-t-full bg-white/10"></div>
									</div>
								) : (
									<GaugeComponent {...createGaugeOptions(bureau.clientScore, bureau.name)} />
								)}
							</div>
							<p className={`relative -top-3 text-xs ${currentUserId !== null ? null : "mt-5 h-4 w-24 animate-pulse rounded-md bg-white/10"}`}>{currentUserId !== null && getCreditRange(bureau.clientScore)}</p>
							<p className={`${currentUserId !== null ? null : "h-4 w-36 animate-pulse rounded-md bg-white/10"} text-xs`}>{currentUserId !== null && formatDate(client.birthDate)}</p>
						</div>
					))}
				</div>
			</>
		)
	)
}
