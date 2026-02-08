import { Product } from "@/types"
import { motion } from "framer-motion"
import { ExternalLink, Info, Tag } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  isLoading?: boolean
}

export function ProductCard({ product, isLoading }: ProductCardProps) {
  if (isLoading) {
    return (
      <div className="w-full h-64 rounded-xl bg-neutral-100 animate-pulse flex items-center justify-center text-neutral-400">
        Cargando...
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100"
    >
      <div className="relative h-48 md:h-64 lg:h-80 w-full bg-neutral-50 flex items-center justify-center p-4">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.product_name || "Imagen del producto"}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="text-neutral-300">Sin imagen disponible</div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-start justify-between">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">
              {product.product_name || "Producto Desconocido"}
            </h2>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2">
              {product.currency} {product.price.toFixed(2)}
            </div>
          </div>
          <p className="text-sm md:text-base text-neutral-500 mt-1 flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {product.brands || "Marca Desconocida"}
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-neutral-100">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Info className="h-3 w-3" /> Categoría
            </span>
            <span className="font-medium text-right max-w-[60%] truncate">
              {product.categories?.split(',')[0] || "General"}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Código</span>
            <span className="font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded">
              {product.code}
            </span>
          </div>
        </div>

        <a
          href={`https://world.openfoodfacts.org/product/${product.code}`}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center text-xs text-primary hover:underline mt-2 flex items-center justify-center gap-1"
        >
          Ver en OpenFoodFacts <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  )
}
