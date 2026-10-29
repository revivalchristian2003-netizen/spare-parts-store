import Image from 'next/image'
import Link from 'next/link'
import { Check, Truck, Shield, ArrowRight, Star, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#f8fbf5] via-[#edf8ec] to-[#e2f3e0] min-h-[610px] grid lg:grid-cols-[47%_53%] overflow-hidden">
      
      {/* Left Copy */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:pl-[5vw] py-[70px]">
        <div className="inline-flex items-center gap-2 bg-white border border-[#d8e8d7] shadow-sm rounded-full px-3 py-2 text-[10px] font-bold text-[#546154] w-fit">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse-dot"></span>
          Trusted by 2.4M+ drivers worldwide
        </div>

        <h1 className="text-[47px] md:text-[64px] lg:text-[76px] leading-[0.98] mt-6 mb-5 text-[#132017]">
          Parts that move<br />
          you <em className="relative not-italic text-brand">
            forward.
            <span className="absolute bottom-1 left-0 w-full h-2 bg-lime/60 -rotate-1 -z-10"></span>
          </em>
        </h1>
        
        <p className="text-[13px] text-[#5c685e] leading-relaxed max-w-[530px] mb-8">
          Premium auto parts, verified fitment and expert support—engineered to keep every journey performing at its best.
        </p>

        {/* Vehicle Search Box */}
        <div className="bg-white border border-[#d9e5d8] rounded-[14px] p-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between shadow-xl shadow-brand/5 max-w-[560px] gap-2">
          <div className="pl-3 py-2">
            <div className="text-[8px] text-[#909890] mb-1">I drive a</div>
            <div className="text-[11px] font-bold text-ink">2022 Toyota Land Cruiser</div>
          </div>
          <Link href="/shop" className="bg-brand hover:bg-brand-dark transition-colors text-white text-[10px] font-extrabold px-5 py-3 rounded-[9px] flex items-center justify-center gap-2">
            Find matching parts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap gap-5 mt-6 text-[8px] font-bold text-[#59645b]">
          <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brand" /> Guaranteed fit</span>
          <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-brand" /> Free express delivery</span>
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand" /> 2-year warranty</span>
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative min-h-[400px] lg:min-h-[610px] mt-8 lg:mt-0">
        <div className="absolute inset-0 lg:top-[-8%] lg:right-[-5%] lg:w-[102%] lg:h-[115%] rounded-tl-[45%] overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1727893119356-1702fe921cf9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1800"
            alt="Modern automotive service workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#edf8ec] via-transparent to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#edf8ec] via-transparent to-transparent lg:hidden" />
        </div>

        {/* Floating Card 1 */}
        <div className="absolute top-[15%] left-[5%] lg:left-[3%] bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl rounded-[13px] p-4 flex items-center gap-3 animate-float z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse-dot"></span>
          <div>
            <div className="font-heading font-bold text-sm">32,000+</div>
            <div className="text-[8px] text-[#748075] mt-0.5">Parts ready to ship</div>
          </div>
        </div>

        {/* Floating Card 2 */}
        <div className="absolute bottom-[10%] left-[5%] lg:left-[-2%] bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl rounded-[13px] p-3 flex items-center gap-2.5 animate-float [animation-delay:-1.3s] z-10">
          <span className="bg-[#122416] text-white text-[17px] font-bold p-2 rounded-[9px] font-heading">4.9</span>
          <div>
            <div className="flex text-[#f3ae18] gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <div className="text-[8px] text-[#748075] mt-1">18,420 verified reviews</div>
          </div>
        </div>
        
        {/* Decorative Rings */}
        <div className="absolute top-[8%] right-[7%] w-[110px] h-[110px] border border-lime/60 rounded-full animate-spin-slow z-10" />
        <div className="absolute bottom-[7%] right-[11%] w-[160px] h-[160px] border border-lime/60 rounded-full animate-spin-slow [animation-direction:reverse] z-10" />
      </div>
    </section>
  )
}