import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { HistoryItem, Product } from '@/types'

interface AppState {
  history: HistoryItem[]
  currentProduct: Product | null
  addToHistory: (product: Product) => void
  setCurrentProduct: (product: Product | null) => void
  clearHistory: () => void
  removeFromHistory: (code: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      history: [],
      currentProduct: null,
      addToHistory: (product) => set((state) => {
        // Remove existing item with same code to avoid duplicates and update timestamp
        const filtered = state.history.filter((item) => item.code !== product.code)
        
        const newItem: HistoryItem = {
          ...product,
          timestamp: Date.now()
        }
        
        // Add to beginning of array
        return { history: [newItem, ...filtered] }
      }),
      setCurrentProduct: (product) => set({ currentProduct: product }),
      clearHistory: () => set({ history: [] }),
      removeFromHistory: (code) => set((state) => ({
        history: state.history.filter((item) => item.code !== code)
      }))
    }),
    {
      name: 'barcode-scanner-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }), // Only persist history
    }
  )
)
