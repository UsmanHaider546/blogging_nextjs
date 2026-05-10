import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-white/80 backdrop-blur-sm">
  {/* Spinning Border */}
  <div className="w-20 h-20 border-[#d03c2f]  border-[5px] border-dashed rounded-full animate-spin"></div>

  {/* Static Image - Centered */}
  <div className="absolute">
    <Image 
      src={'/FairExplain.svg'} 
      className="object-center h-[45px] w-[45px]"
      alt={'Website Logo | fairexplain.com'} 
      width={45} 
      height={45}
      loading="lazy"
      priority={false}
    />
  </div>
</div>
  )
}
