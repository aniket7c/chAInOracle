"use client"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import path from "path"
import MobileNav from "./MobileNav"

const Navbar = () => {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return <div></div>
}

export default Navbar
