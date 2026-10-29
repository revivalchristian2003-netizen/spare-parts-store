import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'

const sampleProducts = [
  {
    id: '1',
    name: 'Brake Pad Set - Front (Ceramic)',
    price: 1899,
    originalPrice: 2499,
    image: '',
    brand: 'Bosch',
    inStock: true,
  },
  {
    id: '2',
    name: 'Oil Filter - Premium',
    price: 349,
    image: '',
    brand: 'Mann Filter',
    inStock: true,
  },
  {
    id: '3',
    name: 'Spark Plug Set (Iridium)',
    price: 1299,
    originalPrice: 1599,
    image: '',
    brand: 'NGK',
    inStock: true,
  },
  {
    id: '4',
    name: 'Air Filter - High Performance',
    price: 599,
    image: '',
    brand: 'K&N',
    inStock: false,
  },
  {
    id: '5',
    name: 'Clutch Kit Complete',
    price: 4599,
    originalPrice: 5299,
    image: '',
    brand: 'Valeo',
    inStock: true,
  },
  {
    id: '6',
    name: 'Timing Belt Kit',
    price: 2899,
    image: '',
    brand: 'Gates',
    inStock: true,
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Parts</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}