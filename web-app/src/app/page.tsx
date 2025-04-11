"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import ReactSpeedometer from "react-d3-speedometer"
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

  const handleChange = (value: string) => setCrypto(value)

  const currentValue = crypto === "Ethereum" ? sentiment.eth : sentiment.btc

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white font-sans px-4 py-8">
      {/* Header */}
      <header className="w-full text-center mb-12">
        <h1 className="text-5xl font-display text-neonPink drop-shadow-md">
          🪐 chAInOracle Dashboard
        </h1>
        <p className="mt-2 text-zinc-400 text-sm">Powered by Chainlink Functions + Sentiment AI</p>
      </header>

      {/* Controls + Speedometer */}
      <div className="w-full flex flex-col items-center gap-8">
        <Select value={crypto} onValueChange={handleChange}>
          <SelectTrigger className="w-[200px] bg-black/60 backdrop-blur border border-neonPink text-white shadow-neon focus:ring-2 focus:ring-neonPink">
            <SelectValue placeholder="Select a crypto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-neonPink">Crypto</SelectLabel>
              <SelectItem value="Ethereum">Ethereum</SelectItem>
              <SelectItem value="Bitcoin">Bitcoin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {loading ? (
          <div className="text-center text-sm text-stone-400 animate-pulse">Fetching data...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="glass-box w-fit px-8 py-6 rounded-2xl shadow-neon border border-zinc-700 flex flex-col items-center animate-fade-in">
            <ReactSpeedometer
              maxValue={100}
              value={currentValue}
              width={500}
              minValue={0}
              needleColor="red"
              startColor="red"
              endColor="green"
              segments={2}
              customSegmentLabels={[
                { text: "Bearish", color: "#fff" },
                { text: "Bullish", color: "#fff" },
              ]}
            />
            <p className="mt-4 text-md text-neonPink font-display animate-pulse-glow">
              Current {crypto} sentiment: {currentValue}/100
            </p>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="mt-16 flex justify-center">
        <a
          href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 font-bold font-display bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-neon hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-neonPink"
        >
          View on Etherscan 🚀
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-zinc-600">
        <p>Made by • KIITUni-22051139,1073,1251,3781</p>
      </footer>
    </main>
  )
}
