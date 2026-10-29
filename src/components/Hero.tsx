'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Genuine Spare Parts
              <span className="block text-blue-400">Delivered Fast</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Find exact OEM & aftermarket parts for your vehicle. 
              Compatible search, genuine quality, and lightning-fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Check Compatibility
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚙️</div>
                <p className="text-slate-300">Premium Parts Visual</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Shield, text: '100% Genuine' },
            { icon: Truck, text: 'Fast Delivery' },
            { icon: RotateCcw, text: 'Easy Returns' },
            { icon: Shield, text: 'Warranty' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-300">
              <item.icon className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}