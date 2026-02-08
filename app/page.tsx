"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { ScanBarcode, History, ChevronLeft } from "lucide-react"
import { Toaster, toast } from "sonner"

import { useAppStore } from "@/store/useAppStore"
import { ProductService } from "@/services/api"
import { SearchForm } from "@/components/SearchForm"
import { ProductCard } from "@/components/ProductCard"
import { HistoryList } from "@/components/HistoryList"
import { BarcodeScanner } from "@/components/BarcodeScanner"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"scan" | "history">("scan")
  const [showScanner, setShowScanner] = useState(false)
  
  const { 
    history, 
    addToHistory, 
    clearHistory, 
    removeFromHistory,
    currentProduct, 
    setCurrentProduct 
  } = useAppStore()

  // Product Fetch Mutation
  const { mutate: searchProduct, isPending, error } = useMutation({
    mutationFn: ProductService.fetchProduct,
    onSuccess: (data) => {
      setCurrentProduct(data)
      addToHistory(data)
      setShowScanner(false)
      setActiveTab("scan")
    },
    onError: (err) => {
      toast.error(err.message || "No se pudo encontrar el producto")
      setCurrentProduct(null)
    }
  })

  // Handle Scan/Search
  const handleSearch = (code: string) => {
    searchProduct(code)
    setShowScanner(false)
  }

  // Handle History Selection
  const handleHistorySelect = (item: Product) => {
    setCurrentProduct(item)
    // Re-add to move to top of history
    addToHistory(item)
    setActiveTab("scan")
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded p-1.5 text-white">
            <ScanBarcode className="h-6 w-6" />
          </div>
          <h1 className="font-bold text-lg text-neutral-900 tracking-tight">ScanPrice</h1>
        </div>
        
        {activeTab === "history" && (
           <Button variant="ghost" size="sm" onClick={() => setActiveTab("scan")} className="text-primary hover:text-primary/80">
             <ChevronLeft className="h-4 w-4 mr-1" /> Volver
           </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8 w-full mx-auto">
        <div className="grid md:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* Search & Product Section */}
          <section className={`md:col-span-6 lg:col-span-7 xl:col-span-8 space-y-6 lg:space-y-8 ${activeTab === "scan" ? "block" : "hidden md:block"}`}>
             <SearchForm 
                onSearch={handleSearch} 
                onToggleScanner={() => setShowScanner(true)}
                isLoading={isPending}
                className=""
              />

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 text-center animate-shake">
                  {error.message}
                </div>
              )}

              {currentProduct && (
                <div className="space-y-2 lg:space-y-4">
                  <h3 className="text-sm font-medium text-neutral-500 px-1">Resultado</h3>
                  <ProductCard product={currentProduct} isLoading={isPending} />
                </div>
              )}
              
              {!currentProduct && !isPending && !error && (
                 <div className="mt-12 lg:mt-20 text-center text-neutral-400 space-y-2">
                   <p className="text-sm lg:text-base">Ingresa un código de barras arriba o escanea para ver detalles</p>
                 </div>
              )}
          </section>

          {/* History Section */}
          <section className={`md:col-span-6 lg:col-span-5 xl:col-span-4 md:border-l md:border-neutral-200 md:pl-6 lg:pl-8 xl:pl-10 h-full ${activeTab === "history" ? "block" : "hidden md:block"}`}>
             <div className="sticky top-20">
              <HistoryList 
                history={history} 
                onSelect={handleHistorySelect} 
                onClear={clearHistory}
                onRemove={removeFromHistory}
              />
            </div>
          </section>

        </div>
      </main>

      {/* Camera Scanner Overlay */}
      {showScanner && (
        <BarcodeScanner 
          onScan={handleSearch} 
          onClose={() => setShowScanner(false)} 
        />
      )}

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-2 flex justify-around shadow-[0_-1px_10px_rgba(0,0,0,0.05)] z-40 max-w-md mx-auto">
        <button 
          onClick={() => setActiveTab("scan")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === "scan" ? "text-primary" : "text-neutral-400 hover:text-neutral-600"}`}
        >
          <ScanBarcode className="h-6 w-6" />
          <span className="text-[10px] font-medium">Escanear</span>
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === "history" ? "text-primary" : "text-neutral-400 hover:text-neutral-600"}`}
        >
          <History className="h-6 w-6" />
          <span className="text-[10px] font-medium">Historial</span>
        </button>
      </nav>
    </div>
  )
}
