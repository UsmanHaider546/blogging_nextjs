'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled beyond a certain height
  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight / 2) { // Show after scrolling half a screen height
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <Button
        onClick={scrollToTop}
        className={`rounded-full p-2 shadow-lg transition-opacity bg-[#3e4bfc] hover:bg-[#f26419]  duration-300 ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        size="icon"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-8 w-8 text-white font-bold" />
      </Button>
    </div>
  )
}
