"use client"
import Image from "next/image"
import ReactSpeedometer from "react-d3-speedometer"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CONTRACT_ABI = ["function s_lastResponse() public view returns (bytes memory)"]
const CONTRACT_ADDRESS = "0xb4e1cc056c3c93c0765c8e39b91486e9a013d8fb"

export default function Home() {
  const [crypto, setCrypto] = useState<string>("Ethereum")
  const [sentiment, setSentiment] = useState<{ eth: number; btc: number }>({ eth: 50, btc: 50 })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSentiment() {
      try {
        setLoading(true)

        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || "RPC")
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

        const responseBytes = await contract.s_lastResponse()
        const responseString = ethers.toUtf8String(responseBytes)

        const ethMatch = responseString.match(/ETH:(\d+)/)
        const btcMatch = responseString.match(/BTC:(\d+)/)

        if (ethMatch && btcMatch) {
          setSentiment({
            eth: parseInt(ethMatch[1]),
            btc: parseInt(btcMatch[1]),
          })
        }
      } catch (err) {
        console.error("Error fetching sentiment:", err)
        setError("Failed to load sentiment data")
      } finally {
        setLoading(false)
      }
    }
    fetchSentiment()
  }, [])

  const handleChange = (value: string) => {
    setCrypto(value)
  }

  const currentValue = crypto === "Ethereum" ? sentiment.eth : sentiment.btc

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-20 py-12 bg-background text-white font-sans transition-all duration-300 ease-in-out">
      {/* Hidden attribution */}
      <div className="hidden" aria-hidden="true"></div>

      <h1 className="text-4xl font-display text-accent animate-bounce-in">Chainlink Sentiment Speedometer</h1>

      <Select value={crypto} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] bg-zinc-900 text-white border border-accent">
          <SelectValue placeholder="Select a crypto" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-accent">Choose Crypto</SelectLabel>
            <SelectItem value="Ethereum">Ethereum</SelectItem>
            <SelectItem value="Bitcoin">Bitcoin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {loading ? (
        <div className="text-center text-sm animate-pulse text-stone-400">Loading sentiment data...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:flex flex-col items-center gap-5 animate-bounce-in shadow-neon p-6 rounded-xl bg-black">
            <ReactSpeedometer
              maxValue={100}
              value={currentValue}
              width={500}
              minValue={0}
              needleColor="red"
              startColor="red"
              segments={2}
              customSegmentLabels={[
                {
                  text: "Bearish",
                  color: "#fff",
                },
                {
                  text: "Bullish",
                  color: "#fff",
                },
              ]}
              endColor="green"
            />
            <p className="text-md text-neonPink font-display animate-pulse-glow">
              Current {crypto} sentiment: {currentValue}/100
            </p>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col items-center gap-3 animate-bounce-in shadow-neon p-4 rounded-xl bg-black">
            <ReactSpeedometer
              maxValue={100}
              value={currentValue}
              width={350}
              minValue={0}
              needleColor="red"
              startColor="red"
              segments={2}
              customSegmentLabels={[
                {
                  text: "Bearish",
                  color: "#fff",
                },
                {
                  text: "Bullish",
                  color: "#fff",
                },
              ]}
              endColor="green"
            />
            <p className="text-sm text-neonPink font-display animate-pulse-glow">
              Current {crypto} sentiment: {currentValue}/100
            </p>
          </div>
        </>
      )}
    </div>
  )
}
