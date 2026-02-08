import { Product } from "@/types"

const BASE_URL = "https://world.openfoodfacts.org/api/v0/product"

export class ProductService {
  static async fetchProduct(barcode: string): Promise<Product> {
    const cleanBarcode = barcode.trim()
    if (!cleanBarcode) throw new Error("Barcode is required")

    try {
      const response = await fetch(`${BASE_URL}/${cleanBarcode}.json`)
      if (!response.ok) {
        throw new Error("Failed to fetch product data")
      }
      
      const data = await response.json()
      
      if (data.status === 0 || !data.product) {
        throw new Error("Product not found")
      }

      const product = data.product
      
      // Simulate price
      const price = Math.floor(Math.random() * (150 - 5 + 1)) + 5
      
      return {
        code: product.code,
        product_name: product.product_name || "Producto Desconocido",
        brands: product.brands || "Marca Desconocida",
        categories: product.categories || "Sin Categoría",
        image_url: product.image_url,
        image_front_url: product.image_front_url,
        price,
        currency: "PEN"
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }
}
