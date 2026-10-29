'use client'

import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  inStock: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-200">
          🔧
        </div>
        {!product.inStock && (
          <Badge className="absolute top-3 left-3 bg-red-500">Out of Stock</Badge>
        )}
        {product.originalPrice && (
          <Badge className="absolute top-3 right-3 bg-green-600">
            Save ₹{product.originalPrice - product.price}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <Button
          className="w-full"
          disabled={!product.inStock}
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}