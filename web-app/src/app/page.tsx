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

// Replace with your contract ABI and address
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

        // Connect to Ethereum provider - ethers v6 syntax
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || "RPC")

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

        // Fetch the latest response
        const responseBytes = await contract.s_lastResponse()
        const responseString = ethers.toUtf8String(responseBytes)

        // Parse the response (format: "ETH:50,BTC:50")
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
    console.log("Made by: github@basefee(Garv-Agarwal) KIITUni-22051159")
    fetchSentiment()
  }, [])

  const handleChange = (value: string) => {
    setCrypto(value)
  }

  const currentValue = crypto === "Ethereum" ? sentiment.eth : sentiment.btc

  return (
    <div className="w-full flex flex-col gap-20 py-12 items-center">
      {/* Hidden attribution element */}
      <div className="hidden" aria-hidden="true">
        Made by: github@basefee(Garv-Agarwal) KIITUni-22051159
      </div>

      <Select value={crypto} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a crypto" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select the crypto</SelectLabel>
            <SelectItem value="Ethereum">Ethereum</SelectItem>
            <SelectItem value="Bitcoin">Bitcoin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {loading ? (
        <div className="text-center">Loading sentiment data...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="text-center hidden md:flex flex-col gap-5">
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
            <p className="text-sm text-stone-700">
              Current {crypto} sentiment: {currentValue}/100
            </p>
          </div>
          <div className="text-center md:hidden flex flex-col gap-3">
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
            <p className="text-sm text-stone-700">
              Current {crypto} sentiment: {currentValue}/100
            </p>
          </div>
        </>
      )}
    </div>
  )
}
