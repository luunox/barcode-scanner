export interface Product {
  code: string
  product_name?: string
  brands?: string
  categories?: string
  image_url?: string
  image_front_url?: string
  price: number // Simulated
  currency: string // "PEN"
}

export interface HistoryItem extends Product {
  timestamp: number
}

export interface SearchState {
  currentProduct: Product | null
  isLoading: boolean
  error: string | null
}
