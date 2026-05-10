"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SearchForm from "./SearchComponent" // Assuming this component exists
import MenuLinks from "./MenuLinks" // Assuming this component exists and returns an array of links

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const handleClose = () => {
    setIsOpen(false)
  }

  const pathname = usePathname()
  const allLinks = MenuLinks() // Assuming MenuLinks is a hook or function that returns an array

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past a certain threshold (e.g., 100px from top)
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 100) {
        // Scrolling up or at the top of the page
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 w-full flex items-center justify-between px-2 py-[3px] bg-[#fff8f0]/20 bg-opacity-50 rounded-md z-50 font-fredokaBold transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href="/" className="flex justify-center items-center min-h-[48px]">
        <Image
          src="/FairExplain.svg?height=45&width=45"
          className="object-center h-[45px] w-[45px] select-none"
          alt="Fair Explain Logo"
          width={45}
          height={45}
          loading="lazy"
          priority={false}
        />
        <div className="leading-[22px] text-[20px] font-black text-[#404045] select-none ">
          {"Fair "} <br /> {"Explain"}
        </div>
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)} role="button" aria-label="Open menu" title="Open menu">
          <MenuIcon className="w-[40px] h-[40px]" />
        </SheetTrigger>
        <SheetContent
          className="max-h-[280px] !max-w-[240px]  rounded-md mt-2 mr-1"
        >
          <SheetTitle
            className="absolute top-1 left-1 flex justify-center items-center select-none opacity-85"
            aria-hidden="true"
          >
            <Image
              src={"/FairExplain.svg?height=32&width=32&query=Fair Explain Logo small"}
              className="object-center h-[32px] w-[32px]"
              alt=""
              width={32}
              height={32}
              loading="lazy"
              priority={false}
            />
            <div className="leading-4.25 text-[15px] font-black text-[#404045] ">
              {"Fair "} <br /> {"Explain"}
            </div>
          </SheetTitle>
          <div className="flex flex-col items-start self-start justify-center gap-1 ml-[10px] mt-12 font-inter font-bold ">
            {allLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                onClick={handleClose}
                className={`flex items-center justify-start text-[25px] font-bold hover:text-[#3a86ff] ${pathname === href ? "text-[#f26419]" : "text-black"} gap-[5px]`}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                <span className="w-[22px] h-[22px] self-center ">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-[4px] w-[90%] left-[10px] rounded-md">
            <SearchForm onClose={handleClose} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
