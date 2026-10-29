'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Star, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  inStock: boolean
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      {/* Holographic Border Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--primary)_360deg)] -z-10" />
      <div className="absolute inset-[1px] rounded-2xl bg-card -z-10" />

      {/* Image Container */}
      <div className="aspect-square bg-muted/30 relative overflow-hidden flex items-center justify-center p-8">
        {/* Placeholder for actual machinery image */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-8xl opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"
        >
          ⚙️
        </motion.div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!product.inStock && (
            <Badge variant="destructive" className="shadow-sm font-medium">Out of Stock</Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-green-500/90 text-white hover:bg-green-600 shadow-sm border-none font-medium">
              Save ₹{product.originalPrice - product.price}
            </Badge>
          )}
          <Badge variant="secondary" className="w-fit backdrop-blur-md bg-background/80 border border-border/50 text-xs font-semibold">
            {product.category}
          </Badge>
        </div>

        {/* Quick Add Button (Appears on Hover) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
        >
          <Button 
            size="icon" 
            className="rounded-full h-12 w-12 shadow-xl shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs font-bold text-primary tracking-widest uppercase">{product.brand}</p>
          <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-md">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold text-foreground">4.9</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-4 group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex items-end justify-between mb-5">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm font-medium text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.inStock && (
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> In Stock
              </span>
            )}
          </div>

          <Button
            className="w-full rounded-xl h-12 font-bold transition-all duration-300 group/btn relative overflow-hidden"
            variant={product.inStock ? "default" : "secondary"}
            disabled={!product.inStock}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            {product.inStock ? (
              <>
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:-translate-y-1 transition-transform" />
                Add to Cart
              </>
            ) : "Notify When Available"}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}