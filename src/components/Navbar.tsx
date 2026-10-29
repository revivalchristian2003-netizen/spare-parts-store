'use client'

import { useCartStore } from '@/store/cartStore'
import { Search, User, ShoppingBag, Zap, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems())

  return (
    <>
      {/* Offer Bar */}
      <div className="bg-brand-deep text-[#e8f5e9] h-[31px] flex items-center justify-center text-[10px] font-semibold tracking-wide">
        <span className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-lime" /> Flash deal: save up to 25% on performance parts
        </span>
        <span className="border-l border-white/20 ml-4 pl-4">
          Use code <strong className="text-lime tracking-widest">DRIVE25</strong>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line h-[73px] flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-ink">
          <div className="bg-brand text-white w-[38px] h-[38px] rounded-tl-[11px] rounded-br-[11px] rounded-tr-[4px] rounded-bl-[4px] flex items-center justify-center -skew-x-2 shadow-lg shadow-brand/20">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-heading text-[17px] font-bold tracking-tighter">
            NEXA<span className="text-brand">PARTS</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-2">
          <Link href="/" className="bg-[#ebf8eb] text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold">Home</Link>
          <Link href="/shop" className="text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold transition-colors">Shop parts</Link>
          <Link href="/performance" className="text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold transition-colors">Performance</Link>
          <Link href="/support" className="text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold transition-colors">Support</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex items-center justify-center hover:text-brand transition-colors">
            <Search className="w-4 h-4" />
          </button>
          
          <button className="flex items-center gap-2 px-2">
            <div className="w-[34px] h-[34px] bg-[#e9f7e9] text-brand-dark rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[8px] text-[#8a928a]">Account</div>
              <div className="text-[10px] font-bold text-ink">Sign in</div>
            </div>
          </button>

          <button className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex items-center justify-center relative hover:text-brand transition-colors">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <button className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex lg:hidden items-center justify-center">
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>
    </>
  )
}