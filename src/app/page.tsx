"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Zap, Search, User, ShoppingBag, Menu, X, ArrowRight, 
  Check, Truck, Shield, Star, Wrench, Car, Box, 
  Heart, Clock, ChevronRight, Filter, Package, Bolt
} from "lucide-react"

type View = "home" | "shop" | "dashboard"
type Product = {
  id: number; name: string; category: string; fitment: string;
  price: number; oldPrice?: number; rating: number; reviews: number;
  badge?: string; image: string; accent: string; description: string; specs: string[];
}

const photos = {
  workshop: "https://images.unsplash.com/photo-1727893119356-1702fe921cf9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=86&w=1800",
  engine: "https://images.unsplash.com/photo-1552656967-7a0991a13906?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  engineBay: "https://images.unsplash.com/photo-1429772011165-0c2e054367b8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  turbo: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  exhaust: "https://images.unsplash.com/photo-1759419281480-bacc913c9606?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  motor: "https://images.unsplash.com/photo-1595787142842-7404bc60470d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  generator: "https://images.unsplash.com/photo-1523559094051-53bac879eb80?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
}

const products: Product[] = [
  { id: 1, name: "AeroFlow Performance Turbo", category: "Engine", fitment: "BMW 3/5 Series · 2017–24", price: 849, oldPrice: 999, rating: 4.9, reviews: 184, badge: "Best seller", image: photos.turbo, accent: "lime", description: "Precision-balanced turbocharger engineered for faster spool, cooler operation and dependable everyday power.", specs: ["Up to 22% faster spool", "Billet compressor wheel", "2-year global warranty"] },
  { id: 2, name: "CarbonX Ceramic Brake Kit", category: "Brakes", fitment: "Mercedes C/E Class · 2018–24", price: 529, rating: 4.8, reviews: 96, badge: "New", image: photos.engineBay, accent: "orange", description: "Low-dust ceramic pads and slotted rotors for confident, quiet stopping in every condition.", specs: ["35% shorter brake fade", "Noise-dampening shims", "ECE R90 certified"] },
  { id: 3, name: "Vortex Pro Air Intake", category: "Engine", fitment: "Toyota Land Cruiser · 2016–24", price: 289, oldPrice: 349, rating: 4.7, reviews: 142, badge: "Save 17%", image: photos.engine, accent: "blue", description: "High-flow cold-air system delivering crisp throttle response while protecting your engine from harsh environments.", specs: ["+11 HP dyno proven", "Washable filter", "Direct bolt-on fit"] },
  { id: 4, name: "VoltEdge Smart Alternator", category: "Electrical", fitment: "Nissan Patrol · 2015–23", price: 419, rating: 4.9, reviews: 77, image: photos.generator, accent: "violet", description: "High-output charging built for modern accessories, extreme heat and long-distance reliability.", specs: ["180A peak output", "Heat-tested to 120°C", "OE connector ready"] },
  { id: 5, name: "TitanFlow Exhaust System", category: "Exhaust", fitment: "Ford F-150 · 2018–24", price: 699, oldPrice: 799, rating: 4.8, reviews: 211, badge: "Top rated", image: photos.exhaust, accent: "red", description: "A deep, refined tone and freer exhaust flow in corrosion-resistant stainless steel.", specs: ["T304 stainless steel", "Dyno-tuned acoustics", "Lifetime shell warranty"] },
  { id: 6, name: "OmniRide Adaptive Damper", category: "Suspension", fitment: "Range Rover Sport · 2017–23", price: 629, rating: 4.7, reviews: 63, image: photos.motor, accent: "cyan", description: "Electronically responsive damping that restores factory comfort and sharpens road control.", specs: ["12ms response time", "OE electronic control", "Salt-spray protected"] },
  { id: 7, name: "Iridium+ Ignition Pack", category: "Electrical", fitment: "Lexus LX/GX · 2016–24", price: 179, rating: 4.9, reviews: 318, badge: "Popular", image: photos.engineBay, accent: "yellow", description: "High-energy coil and plug set for cleaner starts, smooth idle and dependable combustion.", specs: ["60,000 km service life", "Set of 8", "Pre-gapped plugs"] },
  { id: 8, name: "ProGuard Timing Service Kit", category: "Maintenance", fitment: "Volkswagen Group · 2015–22", price: 239, oldPrice: 279, rating: 4.8, reviews: 129, image: photos.motor, accent: "pink", description: "A complete OE-grade timing solution with every component needed for a confident service.", specs: ["OE-grade tensioner", "High-strength belt", "Complete fitting hardware"] },
]

const categories = [
  { name: "Engine", icon: Bolt, count: "4,820 parts", color: "lime" },
  { name: "Brakes", icon: Shield, count: "2,140 parts", color: "orange" },
  { name: "Electrical", icon: Zap, count: "3,760 parts", color: "violet" },
  { name: "Suspension", icon: Wrench, count: "1,980 parts", color: "cyan" },
  { name: "Exhaust", icon: Car, count: "1,240 parts", color: "red" },
  { name: "Maintenance", icon: Box, count: "6,310 parts", color: "yellow" },
]

export default function Home() {
  const [view, setView] = useState<View>("home")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wish, setWish] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState("")

  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0)
  const cartItems = products.filter((product) => cart[product.id])
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category
    const term = query.toLowerCase().trim()
    const matchesSearch = !term || `${product.name} ${product.category} ${product.fitment}`.toLowerCase().includes(term)
    return matchesCategory && matchesSearch
  }), [category, query])

  function flash(message: string) {
    setToast(message)
    setTimeout(() => setToast(""), 2200)
  }

  function addToCart(product: Product, open = false) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }))
    flash(`${product.name} added to your cart`)
    if (open) {
      setSelectedProduct(null)
      setCartOpen(true)
    }
  }

  function navigate(next: View) {
    setView(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function submitLogin(event: FormEvent) {
    event.preventDefault()
    setSignedIn(true)
    setLoginOpen(false)
    flash("Welcome back, Alex")
  }

  // Helper for images so we don't get warnings
  const Img = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f8f6] overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <div className="bg-brand-deep text-[#e8f5e9] h-[31px] flex items-center justify-center text-[10px] font-semibold tracking-wide">
        <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-lime" /> Flash deal: save up to 25% on performance parts</span>
        <span className="border-l border-white/20 ml-4 pl-4 hidden sm:inline">Use code <strong className="text-lime tracking-widest">DRIVE25</strong></span>
      </div>

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line h-[73px] flex items-center justify-between px-4 md:px-[4vw]">
        <button onClick={() => navigate("home")} className="flex items-center gap-2 text-ink">
          <div className="bg-brand text-white w-[38px] h-[38px] rounded-tl-[11px] rounded-br-[11px] rounded-tr-[4px] rounded-bl-[4px] flex items-center justify-center -skew-x-2 shadow-lg shadow-brand/20">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-heading text-[17px] font-bold tracking-tighter">NEXA<span className="text-brand">PARTS</span></span>
        </button>

        <nav className={`${menuOpen ? "flex absolute top-[72px] left-0 right-0 bg-white border-b border-line p-[15px_4vw] flex-col gap-2" : "hidden"} lg:flex lg:static lg:flex-row lg:bg-transparent lg:border-none lg:p-0 gap-2`}>
          <button onClick={() => navigate("home")} className={`px-4 py-2.5 rounded-lg text-[10px] font-bold ${view === 'home' ? 'bg-[#ebf8eb] text-brand-dark' : 'text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark'}`}>Home</button>
          <button onClick={() => navigate("shop")} className={`px-4 py-2.5 rounded-lg text-[10px] font-bold ${view === 'shop' ? 'bg-[#ebf8eb] text-brand-dark' : 'text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark'}`}>Shop parts</button>
          <button onClick={() => { navigate("shop"); setCategory("Engine") }} className="text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold">Performance</button>
          <button onClick={() => document.getElementById("support")?.scrollIntoView({ behavior: "smooth" })} className="text-[#4f594f] hover:bg-[#ebf8eb] hover:text-brand-dark px-4 py-2.5 rounded-lg text-[10px] font-bold">Support</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("shop")} className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex items-center justify-center hover:text-brand transition-colors hidden sm:flex"><Search className="w-4 h-4" /></button>
          <button onClick={() => signedIn ? navigate("dashboard") : setLoginOpen(true)} className="flex items-center gap-2 px-2">
            <div className="w-[34px] h-[34px] bg-[#e9f7e9] text-brand-dark rounded-full flex items-center justify-center"><User className="w-4 h-4" /></div>
            <div className="hidden sm:block text-left">
              <div className="text-[8px] text-[#8a928a]">{signedIn ? "Welcome" : "Account"}</div>
              <div className="text-[10px] font-bold text-ink">{signedIn ? "Alex Morgan" : "Sign in"}</div>
            </div>
          </button>
          <button onClick={() => setCartOpen(true)} className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex items-center justify-center relative hover:text-brand transition-colors">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-brand text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-[38px] h-[38px] bg-[#f3f6f2] rounded-[10px] flex lg:hidden items-center justify-center">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ================= HOME PAGE ================= */}
      {view === "home" && (
        <main>
          <section className="relative bg-gradient-to-br from-[#f8fbf5] via-[#edf8ec] to-[#e2f3e0] min-h-[610px] grid lg:grid-cols-[47%_53%] overflow-hidden">
            <div className="relative z-10 flex flex-col justify-center px-6 md:pl-[5vw] py-[70px]">
              <div className="inline-flex items-center gap-2 bg-white border border-[#d8e8d7] shadow-sm rounded-full px-3 py-2 text-[10px] font-bold text-[#546154] w-fit">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse-dot"></span> Trusted by 2.4M+ drivers worldwide
              </div>
              <h1 className="text-[47px] md:text-[64px] lg:text-[76px] leading-[0.98] mt-6 mb-5 text-[#132017]">
                Parts that move<br />you <em className="relative not-italic text-brand">forward.<span className="absolute bottom-1 left-0 w-full h-2 bg-lime/60 -rotate-1 -z-10"></span></em>
              </h1>
              <p className="text-[13px] text-[#5c685e] leading-relaxed max-w-[530px] mb-8">
                Premium auto parts, verified fitment and expert support—engineered to keep every journey performing at its best.
              </p>
              <div className="bg-white border border-[#d9e5d8] rounded-[14px] p-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between shadow-xl shadow-brand/5 max-w-[560px] gap-2">
                <div className="pl-3 py-2">
                  <div className="text-[8px] text-[#909890] mb-1">I drive a</div>
                  <div className="text-[11px] font-bold text-ink">2022 Toyota Land Cruiser</div>
                </div>
                <button onClick={() => navigate("shop")} className="bg-brand hover:bg-brand-dark transition-colors text-white text-[10px] font-extrabold px-5 py-3 rounded-[9px] flex items-center justify-center gap-2">
                  Find matching parts <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-5 mt-6 text-[8px] font-bold text-[#59645b]">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-brand" /> Guaranteed fit</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-brand" /> Free express delivery</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand" /> 2-year warranty</span>
              </div>
            </div>

            <div className="relative min-h-[400px] lg:min-h-[610px] mt-8 lg:mt-0">
              <div className="absolute inset-0 lg:top-[-8%] lg:right-[-5%] lg:w-[102%] lg:h-[115%] rounded-tl-[45%] overflow-hidden">
                <Image src={photos.workshop} alt="Workshop" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-[#edf8ec] via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#edf8ec] via-transparent to-transparent lg:hidden" />
              </div>
              <div className="absolute top-[15%] left-[5%] lg:left-[3%] bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl rounded-[13px] p-4 flex items-center gap-3 animate-float z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse-dot"></span>
                <div><div className="font-heading font-bold text-sm">32,000+</div><div className="text-[8px] text-[#748075] mt-0.5">Parts ready to ship</div></div>
              </div>
              <div className="absolute bottom-[10%] left-[5%] lg:left-[-2%] bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl rounded-[13px] p-3 flex items-center gap-2.5 animate-float [animation-delay:-1.3s] z-10">
                <span className="bg-[#122416] text-white text-[17px] font-bold p-2 rounded-[9px] font-heading">4.9</span>
                <div>
                  <div className="flex text-[#f3ae18] gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}</div>
                  <div className="text-[8px] text-[#748075] mt-1">18,420 verified reviews</div>
                </div>
              </div>
            </div>
          </section>

          {/* Brands Strip */}
          <div className="bg-white border-y border-line flex overflow-x-auto items-center justify-start lg:justify-center gap-[4.5vw] py-4 px-[4vw] min-h-[76px]">
            <span className="text-[8px] font-extrabold tracking-widest uppercase text-[#8a928a] shrink-0">Parts for every road</span>
            {["BMW", "Mercedes-Benz", "TOYOTA", "NISSAN", "Ford", "VOLKSWAGEN"].map(brand => (
              <strong key={brand} className="font-heading text-[11px] lg:text-[17px] tracking-tight opacity-70 shrink-0">{brand}</strong>
            ))}
          </div>

          {/* Categories */}
          <section className="max-w-[1440px] mx-auto py-[82px] px-6 lg:px-[4vw]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-7">
              <div><span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase block mb-2">Explore the range</span><h2 className="text-[29px] md:text-[43px] leading-[1.05]">Everything your car needs.</h2></div>
              <button onClick={() => navigate("shop")} className="flex items-center gap-1 text-brand-dark text-[9px] font-extrabold hover:gap-2 transition-all mt-4 md:mt-0">View all categories <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((item, i) => (
                <button key={item.name} onClick={() => { setCategory(item.name); navigate("shop") }} className="group relative bg-white border border-line rounded-[14px] flex flex-col items-center justify-center min-h-[174px] p-5 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/5 transition-all">
                  <div className={`w-[67px] h-[67px] rounded-full flex items-center justify-center mb-4 group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform ${
                    item.color === 'lime' ? 'bg-[#effbd2] text-[#5b7e05]' : 
                    item.color === 'orange' ? 'bg-[#fff0db] text-[#c26700]' : 
                    item.color === 'violet' ? 'bg-[#f1eaff] text-[#7447bf]' : 
                    item.color === 'cyan' ? 'bg-[#dcf7f7] text-[#07858c]' : 
                    item.color === 'red' ? 'bg-[#ffe7e5] text-[#cc4036]' : 'bg-[#fff7ce] text-[#a67b00]'
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <strong className="font-heading text-xs">{item.name}</strong>
                  <small className="text-muted text-[7px] mt-1">{item.count}</small>
                  <ChevronRight className="absolute right-3 top-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="max-w-[1440px] mx-auto pb-20 px-6 lg:px-[4vw]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-7">
              <div><span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase block mb-2">Driver favourites</span><h2 className="text-[29px] md:text-[43px] leading-[1.05]">Built to perform. Chosen by experts.</h2></div>
              <button onClick={() => navigate("shop")} className="flex items-center gap-1 text-brand-dark text-[9px] font-extrabold hover:gap-2 transition-all mt-4 md:mt-0">Shop all products <ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} setSelectedProduct={setSelectedProduct} wish={wish} setWish={setWish} />
              ))}
            </div>
          </section>

          {/* Performance Banner */}
          <section className="bg-[#092611] max-w-[1440px] mx-auto grid lg:grid-cols-2 min-h-[480px] overflow-hidden relative">
            <div className="relative min-h-[310px] lg:min-h-full">
              <Image src={photos.engine} alt="Engine" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092611] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#092611]" />
            </div>
            <div className="relative flex flex-col justify-center p-8 lg:p-[60px_8vw_60px_55px] text-white">
              <span className="text-lime text-[8px] font-extrabold tracking-widest uppercase mb-3">Nexa performance series</span>
              <h2 className="text-[32px] md:text-[43px] leading-[1.05]">Unleash what's under the hood.</h2>
              <p className="text-[#aec1b1] text-[11px] leading-relaxed mt-4 mb-7 max-w-[490px]">Track-tested upgrades with road-ready reliability. More response, more control, more reasons to take the long way home.</p>
              <div className="flex gap-10 mb-8">
                <div><strong className="font-heading text-[22px] text-lime block">+22%</strong><small className="text-[#93aa97] text-[7px] mt-1 block">Power potential</small></div>
                <div><strong className="font-heading text-[22px] text-lime block">2 yr</strong><small className="text-[#93aa97] text-[7px] mt-1 block">Full warranty</small></div>
                <div><strong className="font-heading text-[22px] text-lime block">48 hr</strong><small className="text-[#93aa97] text-[7px] mt-1 block">Global dispatch</small></div>
              </div>
              <button onClick={() => { setCategory("Engine"); navigate("shop") }} className="bg-lime text-[#15300f] hover:-translate-y-0.5 text-[9px] font-extrabold px-4 py-3 rounded-[9px] flex items-center gap-2 w-fit transition-transform">Explore performance <ArrowRight className="w-4 h-4" /></button>
            </div>
          </section>

          {/* Trust Section */}
          <section className="max-w-[1440px] mx-auto py-20 px-6 lg:px-[4vw] grid lg:grid-cols-[1fr_0.85fr] gap-10 items-center">
            <div>
              <span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase mb-3 block">Confidence comes standard</span>
              <h2 className="text-[29px] md:text-[43px] leading-[1.05]">The right part. The first time. Every time.</h2>
              <p className="text-muted text-[11px] leading-relaxed mt-4 mb-7 max-w-[540px]">Our fitment specialists and AI-powered catalogue cross-check every component against your exact vehicle.</p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <span className="w-[37px] h-[37px] rounded-[9px] bg-[#e9f7e9] text-brand flex items-center justify-center shrink-0"><Check className="w-4 h-4" /></span>
                  <div><strong className="text-[10px] block">100% fitment guarantee</strong><small className="text-muted text-[8px] block mt-0.5">If it doesn't fit, returns and replacement are on us.</small></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-[37px] h-[37px] rounded-[9px] bg-[#e9f7e9] text-brand flex items-center justify-center shrink-0"><Shield className="w-4 h-4" /></span>
                  <div><strong className="text-[10px] block">Quality verified</strong><small className="text-muted text-[8px] block mt-0.5">Every supplier and part passes our 40-point quality standard.</small></div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-[37px] h-[37px] rounded-[9px] bg-[#e9f7e9] text-brand flex items-center justify-center shrink-0"><Wrench className="w-4 h-4" /></span>
                  <div><strong className="text-[10px] block">Real expert support</strong><small className="text-muted text-[8px] block mt-0.5">Talk to certified parts specialists, seven days a week.</small></div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#eff9ed] to-[#e0f1de] border border-[#cce2c9] rounded-[22px] p-8 shadow-[20px_20px_0_#f4f7f3] relative">
              <div className="absolute right-5 top-2 text-[130px] font-serif leading-none text-brand/10 pointer-events-none">"</div>
              <div className="flex items-center gap-2"><strong className="font-heading text-[25px]">4.9</strong><div className="flex text-[#f3ae18]">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}</div><small className="text-muted text-[7px]">Excellent · 18,420 reviews</small></div>
              <blockquote className="font-heading font-semibold text-[17px] leading-relaxed mt-7 mb-7 relative z-10 text-[#263228]">"Finding the exact turbo for my BMW took minutes. It arrived in two days, fitted perfectly, and the improvement is incredible."</blockquote>
              <div className="flex items-center">
                <span className="w-9 h-9 rounded-full bg-brand-deep text-white text-[8px] font-extrabold flex items-center justify-center mr-2.5">JM</span>
                <div><strong className="text-[9px] block">James Mitchell</strong><small className="text-muted text-[7px] block mt-0.5">Verified buyer · United Kingdom</small></div>
                <span className="ml-auto text-brand-dark text-[7px] font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Verified</span>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section id="support" className="bg-lime max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 p-10 relative overflow-hidden mb-20 rounded-2xl">
            <div className="relative z-10">
              <span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase mb-2 block">Join the inner circle</span>
              <h2 className="text-[30px] font-heading leading-tight">Better drives start in your inbox.</h2>
              <p className="text-[#485b27] text-[9px] mt-2">New drops, expert guides and members-only offers. No noise—just useful stuff.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); flash("You're on the list — welcome to the club") }} className="bg-white rounded-[11px] p-1.5 flex w-full lg:min-w-[430px] relative z-10">
              <input type="email" required placeholder="Enter your email address" className="bg-transparent border-none text-[9px] outline-none px-3 w-full" />
              <button type="submit" className="bg-brand text-white text-[10px] font-extrabold px-4 py-3 rounded-[9px] flex items-center gap-2 shrink-0 hover:bg-brand-dark transition-colors">Join Nexa Club <ArrowRight className="w-4 h-4" /></button>
            </form>
          </section>
        </main>
      )}

      {/* ================= SHOP PAGE ================= */}
      {view === "shop" && (
        <main className="min-h-[700px]">
          <section className="bg-[#0b2b12] text-white py-[65px] px-6 lg:px-[5vw] relative overflow-hidden">
            <div className="absolute right-[4%] top-[-40px] w-[400px] h-[250px] bg-[radial-gradient(circle,rgba(185,242,39,0.16),transparent_65%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-lime text-[8px] font-extrabold tracking-widest uppercase mb-2 block">32,000+ verified parts</span>
              <h1 className="text-[29px] md:text-[43px] leading-tight font-heading">Find your perfect part.</h1>
              <p className="text-[#a8baab] text-[10px] mt-3">Search by part, brand or vehicle. Every result is quality checked and ready to perform.</p>
            </div>
            <div className="bg-white rounded-[12px] flex items-center p-1.5 pl-4 mt-7 max-w-[720px] relative z-10">
              <Search className="w-4 h-4 text-[#849085]" />
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Try 'brake pads for BMW X5'" className="border-none text-[10px] outline-none px-3 w-full bg-transparent text-ink" />
              <button className="bg-brand text-white text-[10px] font-extrabold px-4 py-3 rounded-[9px] shrink-0">Search</button>
            </div>
          </section>
          
          <section className="max-w-[1440px] mx-auto py-8 px-6 lg:px-[4vw] pb-20">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-[9px] font-bold whitespace-nowrap"><Filter className="w-4 h-4" /> Filter by</div>
              <div className="flex gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
                {["All", ...categories.map(c => c.name)].map(item => (
                  <button key={item} onClick={() => setCategory(item)} className={`shrink-0 text-[8px] font-bold px-3 py-2 rounded-full border transition-colors ${category === item ? 'bg-brand text-white border-brand' : 'bg-white text-muted border-line'}`}>{item}</button>
                ))}
              </div>
              <span className="text-muted text-[8px] ml-auto whitespace-nowrap hidden lg:block">{filteredProducts.length} products</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} setSelectedProduct={setSelectedProduct} wish={wish} setWish={setWish} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center p-20 text-center text-muted">
                <Search className="w-8 h-8 mb-4" />
                <h2 className="text-2xl font-heading text-ink mb-2">No matching parts yet</h2>
                <p className="text-[9px]">Try a broader search or choose another category.</p>
                <button onClick={() => { setQuery(""); setCategory("All") }} className="bg-brand text-white text-[9px] font-bold px-4 py-2.5 rounded-lg mt-5">Clear filters</button>
              </div>
            )}
          </section>
        </main>
      )}

      {/* ================= DASHBOARD PAGE ================= */}
      {view === "dashboard" && (
        <main className="bg-[#f5f7f4] min-h-[850px] py-12 px-6 lg:px-[4vw]">
          <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
            <div>
              <span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase mb-2 block">My Nexa garage</span>
              <h1 className="text-[29px] md:text-[43px] leading-tight font-heading">Good afternoon, Alex.</h1>
              <p className="text-muted text-[10px] mt-2">Your vehicles, orders and rewards—all tuned up and ready.</p>
            </div>
            <button onClick={() => navigate("shop")} className="bg-brand hover:bg-brand-dark text-white text-[9px] font-extrabold px-4 py-3 rounded-[9px] flex items-center gap-2 transition-colors">Shop new parts <ArrowRight className="w-4 h-4" /></button>
          </section>

          <section className="grid lg:grid-cols-[225px_1fr] gap-5">
            <aside className="bg-white border border-line rounded-[14px] p-3.5 h-fit">
              <div className="flex items-center gap-2.5 border-b border-line pb-4 mb-2">
                <span className="w-[39px] h-[39px] bg-brand-deep text-white rounded-[10px] flex items-center justify-center text-[9px] font-extrabold">AM</span>
                <div><strong className="text-[9px] block">Alex Morgan</strong><small className="text-brand-dark text-[7px] mt-0.5 block">Nexa Plus member</small></div>
              </div>
              {[
                { name: "Overview", icon: Box, active: true },
                { name: "My orders", icon: Package },
                { name: "My garage", icon: Car },
                { name: "Saved parts", icon: Heart },
                { name: "Reviews", icon: Star },
                { name: "Addresses", icon: User }
              ].map((item, i) => (
                <button key={item.name} className={`w-full flex items-center gap-2 text-[8px] font-bold p-2.5 rounded-lg my-0.5 ${item.active ? 'bg-[#eaf8ea] text-brand-dark' : 'text-muted hover:bg-[#f5f7f4]'}`}>
                  <item.icon className="w-4 h-4" /> {item.name} <ChevronRight className="w-3 h-3 ml-auto" />
                </button>
              ))}
              <button onClick={() => { setSignedIn(false); navigate("home"); flash("Signed out successfully") }} className="w-full flex items-center gap-2 text-[8px] font-bold p-2.5 rounded-lg mt-3 border-t border-line text-[#b14141] pt-4 hover:bg-red-50">Sign out</button>
            </aside>

            <div className="flex flex-col gap-4">
              <div className="grid md:grid-cols-3 gap-3">
                <article className="bg-white border border-line rounded-[13px] p-4 flex items-center">
                  <span className="w-[42px] h-[42px] rounded-[10px] bg-[#e9f8e9] text-brand flex items-center justify-center mr-3"><Package className="w-5 h-5" /></span>
                  <div><small className="text-muted text-[7px] block">Active orders</small><strong className="font-heading text-[20px]">02</strong></div>
                  <b className="text-brand-dark text-[7px] ml-auto">Track now</b>
                </article>
                <article className="bg-white border border-line rounded-[13px] p-4 flex items-center">
                  <span className="w-[42px] h-[42px] rounded-[10px] bg-[#fff0dc] text-[#c46b05] flex items-center justify-center mr-3"><Car className="w-5 h-5" /></span>
                  <div><small className="text-muted text-[7px] block">Garage vehicles</small><strong className="font-heading text-[20px]">03</strong></div>
                  <b className="text-brand-dark text-[7px] ml-auto">Manage</b>
                </article>
                <article className="bg-white border border-line rounded-[13px] p-4 flex items-center">
                  <span className="w-[42px] h-[42px] rounded-[10px] bg-[#f0eaff] text-[#7851b8] flex items-center justify-center mr-3"><Bolt className="w-5 h-5" /></span>
                  <div><small className="text-muted text-[7px] block">Nexa points</small><strong className="font-heading text-[20px]">2,840</strong></div>
                  <b className="text-brand-dark text-[7px] ml-auto">$28.40 value</b>
                </article>
              </div>

              <article className="bg-white border border-line rounded-[14px] p-5">
                <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold"><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />In transit</div>
                  <small className="text-muted text-[7px] font-semibold">Order #NX-829104</small>
                </div>
                <div className="flex items-center py-4">
                  <Img src={products[0].image} alt="" className="w-[66px] h-[56px] rounded-[9px] mr-3" />
                  <div><strong className="text-[10px] block">{products[0].name}</strong><small className="text-muted text-[7px] mt-1 block">BMW 3/5 Series · Qty 1</small></div>
                  <span className="font-heading text-[13px] font-bold ml-auto">$849.00</span>
                </div>
                <div className="px-1 py-2">
                  <div className="bg-[#dfe4df] h-0.5 w-full flex justify-between relative">
                    <div className="absolute left-0 top-0 h-full bg-brand w-[67%]" />
                    {[0,1,2,3].map(i => (
                      <div key={i} className={`w-[11px] h-[11px] rounded-full -mt-1 border-2 relative z-10 ${i < 2 ? 'bg-brand border-brand' : i === 2 ? 'bg-white border-brand shadow-[0_0_0_4px_#e6f5e6]' : 'bg-white border-[#cbd2cb]'}`} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2.5">
                    {["Ordered", "Dispatched", "In transit", "Delivered"].map((step, i) => (
                      <div key={step} className="flex flex-col"><b className="text-[7px]">{step}</b><small className="text-muted text-[6px] mt-0.5">{["Jun 12", "Jun 13", "Today", "Jun 16"][i]}</small></div>
                    ))}
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-brand-dark text-[8px] font-extrabold ml-auto mt-2">Track shipment <ArrowRight className="w-3 h-3" /></button>
              </article>

              <article className="bg-white border border-line rounded-[14px] p-5">
                <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
                  <div className="text-[10px] font-extrabold">My garage</div>
                  <button className="text-brand-dark text-[8px] font-bold">+ Add vehicle</button>
                </div>
                <div className="flex flex-wrap items-center pt-2">
                  <div className="w-[90px] h-[67px] rounded-[12px] bg-gradient-to-br from-[#e8f7e7] to-[#cbe8c9] flex items-center justify-center text-brand-dark mr-3 shrink-0"><Car className="w-8 h-8" /></div>
                  <div className="flex-1 min-w-[150px]">
                    <small className="text-brand-dark text-[6px] font-extrabold uppercase block">Primary vehicle</small>
                    <strong className="text-[11px] mt-1 block">2022 Toyota Land Cruiser</strong>
                    <p className="text-muted text-[7px]">3.5L V6 Twin Turbo · 4WD</p>
                  </div>
                  <button onClick={() => navigate("shop")} className="bg-[#edf8ed] text-brand-dark text-[8px] font-extrabold px-3 py-2.5 rounded-lg flex items-center gap-1.5 mt-4 lg:mt-0 w-full lg:w-auto justify-center">Shop compatible parts <ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
              </article>
            </div>
          </section>
        </main>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#071b0c] text-white pt-16 pb-6">
        <div className="max-w-[1440px] mx-auto px-[4vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,0.7fr)_1.2fr] gap-8 lg:gap-[4vw]">
          <div className="lg:col-span-1 md:col-span-2">
            <button onClick={() => navigate("home")} className="flex items-center gap-2 text-white mb-4">
              <div className="bg-brand text-white w-9 h-9 rounded-tl-[11px] rounded-br-[11px] rounded-tr-[4px] rounded-bl-[4px] flex items-center justify-center -skew-x-2"><Zap className="w-5 h-5" /></div>
              <span className="font-heading text-[17px] font-bold tracking-tighter">NEXA<span className="text-brand">PARTS</span></span>
            </button>
            <p className="text-[#78907c] text-[9px] mb-5">Premium parts. Perfect fit. Every road.</p>
            <div className="flex gap-2">
              {["f", "in", "▶", "◎"].map(icon => <span key={icon} className="w-[29px] h-[29px] rounded-full bg-white/5 flex items-center justify-center text-[8px] text-[#a9b8ab]">{icon}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <strong className="text-[9px] mb-1">Shop</strong>
            <button onClick={() => navigate("shop")} className="text-left text-[8px] text-[#819284] hover:text-lime">All parts</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Performance</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">New arrivals</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Offers</button>
          </div>
          <div className="flex flex-col gap-2.5">
            <strong className="text-[9px] mb-1">Support</strong>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Help centre</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Fitment help</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Shipping</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Returns</button>
          </div>
          <div className="flex flex-col gap-2.5">
            <strong className="text-[9px] mb-1">Company</strong>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Our story</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Quality promise</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Careers</button>
            <button className="text-left text-[8px] text-[#819284] hover:text-lime">Contact</button>
          </div>
          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <strong className="text-[9px] mb-2">Need a parts expert?</strong>
            <b className="font-heading text-[17px] text-lime">+1 800 555 NEXA</b>
            <small className="text-[#758678] text-[7px] mt-1 mb-4 block">Mon–Sun · 24/7 global support</small>
            <button className="flex items-center gap-2 border border-lime/25 text-[#c3d6c6] px-3 py-2.5 rounded-md text-[8px] w-fit"><span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" /> Chat with an expert</button>
          </div>
        </div>
        <div className="border-t border-white/5 max-w-[1440px] mx-auto px-[4vw] py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[7px] text-[#667768] mt-6">
          <span>© 2025 Nexa Parts Global. UI demonstration only.</span>
          <div className="flex gap-4">
            <button className="hover:text-white">Privacy</button>
            <button className="hover:text-white">Terms</button>
            <button className="hover:text-white">Accessibility</button>
          </div>
          <span className="font-extrabold tracking-wider text-[#a1b0a3]">VISA · MC · Pay</span>
        </div>
      </footer>

      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051308]/50 animate-fade" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-[18px] shadow-2xl overflow-hidden max-h-[92vh] w-full max-w-[940px] grid lg:grid-cols-[48%_52%] relative animate-modal-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#f1f4f0] flex items-center justify-center hover:bg-gray-200"><X className="w-4 h-4" /></button>
            <div className="relative min-h-[300px] lg:min-h-[560px]">
              <Image src={selectedProduct.image} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051408] via-transparent to-transparent opacity-50" />
              <span className="absolute bottom-5 left-6 text-white text-[8px] font-bold z-10">360° product view</span>
            </div>
            <div className="p-8 lg:p-10 overflow-y-auto">
              <span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase mb-2 block">{selectedProduct.category} · In stock</span>
              <h2 className="text-[27px] font-heading leading-tight mb-3">{selectedProduct.name}</h2>
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-[#f3ae18]">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
                <b className="text-[10px]">{selectedProduct.rating}</b><span className="text-[#8a928b] text-[8px]">{selectedProduct.reviews} verified reviews</span>
              </div>
              <p className="text-muted text-[9px] leading-relaxed mb-5">{selectedProduct.description}</p>
              <div className="bg-[#e9f8e9] border border-[#c8e6c7] rounded-[9px] p-3 flex items-center gap-2.5 mb-5 text-brand-dark">
                <Check className="w-4 h-4" />
                <div><strong className="text-[8px] block">Confirmed fit for your vehicle</strong><small className="text-[7px] text-[#5f7961] block mt-0.5">2022 Toyota Land Cruiser · Change vehicle</small></div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <strong className="font-heading text-[27px]">${selectedProduct.price}</strong>
                {selectedProduct.oldPrice && <del className="text-[#9da39d] text-[10px]">${selectedProduct.oldPrice}</del>}
                <span className="text-muted text-[7px] ml-auto">or 4 payments of ${(selectedProduct.price / 4).toFixed(2)}</span>
              </div>
              <button onClick={() => addToCart(selectedProduct, true)} className="w-full bg-brand hover:bg-brand-dark text-white text-[10px] font-extrabold py-3.5 rounded-[9px] flex items-center justify-center gap-2 mb-6"><ShoppingBag className="w-4 h-4" /> Add to cart</button>
              
              <div className="flex border-b border-line gap-6 mb-4">
                <button className="text-[8px] font-bold text-brand-dark border-b-2 border-brand pb-2">Highlights</button>
                <button className="text-[8px] font-bold text-muted pb-2">Customer reviews</button>
              </div>
              <ul className="grid grid-cols-2 gap-2 mb-5">
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[8px] text-[#4d584e]"><Check className="w-3 h-3 text-brand" />{spec}</li>
                ))}
              </ul>
              <div className="border-t border-line pt-4 flex justify-between">
                <span className="flex items-center gap-1 text-muted text-[7px]"><Truck className="w-4 h-4 text-brand" /> Free delivery</span>
                <span className="flex items-center gap-1 text-muted text-[7px]"><Shield className="w-4 h-4 text-brand" /> 2-year warranty</span>
                <span className="flex items-center gap-1 text-muted text-[7px]"><Clock className="w-4 h-4 text-brand" /> 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CART DRAWER ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] bg-[#051308]/50 animate-fade flex justify-end" onClick={() => setCartOpen(false)}>
          <aside className="bg-white w-full max-w-[430px] h-full flex flex-col animate-slide-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-line p-6">
              <div><h2 className="font-heading text-[22px]">Your cart</h2><span className="text-muted text-[8px]">{cartCount} {cartCount === 1 ? "item" : "items"}</span></div>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full bg-[#f1f4f0] flex items-center justify-center hover:bg-gray-200"><X className="w-4 h-4" /></button>
            </div>
            
            {cartItems.length ? (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-2">
                  {cartItems.map(product => (
                    <div key={product.id} className="grid grid-cols-[72px_1fr_auto] gap-3 border-b border-line py-4">
                      <Img src={product.image} alt="" className="w-[72px] h-[68px] rounded-[9px]" />
                      <div>
                        <strong className="text-[9px] block">{product.name}</strong>
                        <small className="text-muted text-[7px] mt-1 mb-2 block">{product.fitment}</small>
                        <div className="flex items-center border border-line rounded-[6px] w-fit">
                          <button onClick={() => setCart(curr => ({ ...curr, [product.id]: Math.max(0, curr[product.id] - 1) }))} className="w-6 h-6 text-muted hover:bg-gray-100">−</button>
                          <span className="text-[8px] w-5 text-center">{cart[product.id]}</span>
                          <button onClick={() => addToCart(product)} className="w-6 h-6 text-muted hover:bg-gray-100">+</button>
                        </div>
                      </div>
                      <b className="font-heading text-[11px]">${product.price * cart[product.id]}</b>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line p-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] font-bold">Subtotal</span>
                    <strong className="font-heading text-[19px]">${subtotal.toLocaleString()}</strong>
                  </div>
                  <p className="bg-[#ecf8eb] text-brand-dark text-[7px] p-2.5 rounded-md flex items-center gap-1.5 mb-3"><Truck className="w-4 h-4" /> You've unlocked free express shipping</p>
                  <button onClick={() => flash("Checkout is available in the full commerce edition")} className="w-full bg-brand hover:bg-brand-dark text-white text-[9px] font-extrabold py-3 rounded-[9px] flex items-center justify-center gap-2">Secure checkout <ArrowRight className="w-4 h-4" /></button>
                  <small className="flex items-center justify-center gap-1 text-muted text-[7px] mt-3"><Shield className="w-3 h-3" /> Secure checkout · 30-day easy returns</small>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#e8f7e8] text-brand flex items-center justify-center mb-5"><ShoppingBag className="w-7 h-7" /></div>
                <h2 className="font-heading text-[20px] mb-2">Your cart is ready for adventure</h2>
                <p className="text-muted text-[9px] leading-relaxed">Explore thousands of verified parts built for your vehicle.</p>
                <button onClick={() => { setCartOpen(false); navigate("shop") }} className="bg-brand text-white text-[9px] font-extrabold px-4 py-3 rounded-lg mt-6">Start shopping</button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= LOGIN MODAL ================= */}
      {loginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051308]/50 animate-fade" onClick={() => setLoginOpen(false)}>
          <div className="bg-white rounded-[18px] shadow-2xl max-h-[92vh] overflow-auto w-full max-w-[790px] grid lg:grid-cols-[42%_58%] relative animate-modal-in" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLoginOpen(false)} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#f1f4f0] flex items-center justify-center hover:bg-gray-200"><X className="w-4 h-4" /></button>
            <div className="bg-gradient-to-br from-[#062d0d] to-[#0b5b16] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-tl-[11px] rounded-br-[11px] rounded-tr-[4px] rounded-bl-[4px] bg-lime text-[#12310b] flex items-center justify-center mb-20 -skew-x-2"><Zap className="w-5 h-5" /></div>
                <h2 className="font-heading text-[30px] leading-[1.05] mb-4">Your garage, everywhere.</h2>
                <p className="text-[#a7c0aa] text-[9px] leading-relaxed">Track orders, save vehicles and get parts matched perfectly to your car.</p>
              </div>
              <ul className="flex flex-col gap-2.5 relative z-10">
                {["Fitment saved across devices", "Faster checkout and live tracking", "Exclusive member pricing"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-[8px] text-[#c3d5c5]"><Check className="w-3.5 h-3.5 text-lime" />{item}</li>
                ))}
              </ul>
            </div>
            <form onSubmit={submitLogin} className="p-8 lg:p-10">
              <span className="text-brand-dark text-[8px] font-extrabold tracking-widest uppercase mb-2 block">Welcome back</span>
              <h2 className="font-heading text-[25px] mb-1">Sign in to Nexa</h2>
              <p className="text-muted text-[8px] mb-6">Use any details to explore this UI prototype.</p>
              
              <label className="text-[#49514a] text-[8px] font-bold block mb-3">
                Email address
                <input defaultValue="alex@nexaparts.demo" required type="email" className="w-full bg-[#f7f9f6] border border-line rounded-lg p-3 text-[9px] mt-1.5 outline-none focus:border-brand" />
              </label>
              <label className="text-[#49514a] text-[8px] font-bold block mb-4">
                Password
                <div className="flex bg-[#f7f9f6] border border-line rounded-lg mt-1.5 focus-within:border-brand pr-2">
                  <input defaultValue="demopassword" required type="password" className="w-full bg-transparent p-3 text-[9px] outline-none" />
                  <button type="button" className="text-brand-dark text-[7px] font-bold">Show</button>
                </div>
              </label>
              
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-1 text-muted text-[7px]"><input type="checkbox" className="w-3 h-3 accent-brand" /> Remember me</label>
                <button type="button" className="text-brand-dark text-[7px] font-bold">Forgot password?</button>
              </div>
              <button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white text-[9px] font-extrabold py-3 rounded-lg flex items-center justify-center gap-2">Sign in <ArrowRight className="w-4 h-4" /></button>
              
              <div className="relative border-t border-line mt-6 mb-4 text-center">
                <span className="bg-white px-2 text-[#9aa19b] text-[7px] relative -top-2.5">or continue with</span>
              </div>
              <div className="flex gap-2">
                <button type="button" className="flex-1 bg-white border border-line text-ink text-[8px] font-bold py-2.5 rounded-lg">G Google</button>
                <button type="button" className="flex-1 bg-white border border-line text-ink text-[8px] font-bold py-2.5 rounded-lg"> Apple</button>
              </div>
              
              <small className="text-muted text-[7px] text-center block mt-5">New to Nexa? <button type="button" className="text-brand-dark font-bold">Create free account</button></small>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] bg-[#102d16] border border-white/10 text-white text-[8px] font-bold px-4 py-3 rounded-[10px] flex items-center gap-2 animate-toast-in shadow-2xl">
          <span className="w-5 h-5 rounded-full bg-brand flex items-center justify-center"><Check className="w-3 h-3" /></span>
          {toast}
        </div>
      )}

    </div>
  )
}

// ================= COMPONENTS =================

function ProductCard({ product, addToCart, setSelectedProduct, wish, setWish }: { product: Product, addToCart: any, setSelectedProduct: any, wish: number[], setWish: any }) {
  const liked = wish.includes(product.id)
  
  return (
    <article className="bg-white border border-line rounded-[15px] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all group">
      <div className="h-[220px] relative cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(product)}>
        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.badge && <span className="absolute top-3 left-3 bg-brand-deep text-white text-[7px] font-extrabold tracking-wider px-2 py-1.5 rounded uppercase z-10">{product.badge}</span>}
        <button 
          onClick={(e) => { e.stopPropagation(); setWish((curr: any) => liked ? curr.filter((id: number) => id !== product.id) : [...curr, product.id]) }} 
          className={`absolute top-2.5 right-2.5 w-[33px] h-[33px] rounded-full bg-white/90 flex items-center justify-center z-10 ${liked ? 'text-red-500' : 'text-[#5c675d]'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[8px] font-extrabold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all z-10">Quick view</span>
      </div>
      <div className="p-4">
        <small className="text-brand-dark text-[7px] font-extrabold tracking-widest uppercase">{product.category}</small>
        <h3 className="font-heading text-[13px] tracking-tight mt-1.5 mb-2 cursor-pointer hover:text-brand" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
        <p className="flex items-center gap-1 text-muted text-[7px]"><Car className="w-3 h-3" /> {product.fitment}</p>
        <div className="flex items-center gap-1 mt-3">
          <div className="flex text-[#f3ae18]">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}</div>
          <b className="text-[8px]">{product.rating}</b><span className="text-[#8a928b] text-[7px]">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between border-t border-[#edf0ec] mt-4 pt-3">
          <div>
            <strong className="font-heading text-[17px]">${product.price}</strong>
            {product.oldPrice && <del className="text-[#9aa09a] text-[9px] ml-1">${product.oldPrice}</del>}
          </div>
          <button onClick={() => addToCart(product)} className="w-[34px] h-[34px] rounded-lg bg-brand text-white flex items-center justify-center hover:bg-brand-deep hover:scale-105 transition-all"><ShoppingBag className="w-4 h-4" /></button>
        </div>
      </div>
    </article>
  )
}