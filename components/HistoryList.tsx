import { HistoryItem } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ExternalLink, X, Search, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"

interface HistoryListProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
  onRemove: (code: string) => void
}

export function HistoryList({ history, onSelect, onClear, onRemove }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-neutral-400 space-y-2">
        <Clock className="h-8 w-8 mx-auto opacity-50" />
        <p className="text-sm">No hay búsquedas recientes</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-neutral-500 flex items-center gap-2">
          <Clock className="h-4 w-4" /> Escaneos recientes
        </h3>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-auto py-0 px-2 text-xs text-neutral-400 hover:text-destructive">
          Borrar Todo
        </Button>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {history.map((item) => (
            <motion.div
              key={`${item.code}-${item.timestamp}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="group relative bg-white rounded-lg border border-neutral-100 p-2 flex items-center gap-3 shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
            >
              <div 
                className="flex-1 flex items-center gap-3 cursor-pointer"
                onClick={() => onSelect(item)}
              >
                <div className="h-10 w-10 relative bg-neutral-50 rounded shrink-0 overflow-hidden">
                   {item.image_url ? (
                    <Image 
                      src={item.image_url} 
                      alt="" 
                      fill 
                      className="object-contain p-1"
                      sizes="40px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300"> 
                      <Search className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <div className="flex min-w-0 flex-1 items-center justify-between">
                  <h4 className="flex flex-col gap-1 text-sm font-medium text-neutral-900 truncate">
                    {item.product_name || "Producto Desconocido"}
                    <span className="truncate max-w-[100px] text-xs text-neutral-500">{item.brands}</span>
                  </h4>
                  <span className="w-1 h-1 rounded-full bg-neutral-300" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-primary">
                      {item.currency} {item.price}
                    </p>
                    <span className="text-xs whitespace-nowrap">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                
                  <div className=" flex items-center gap-2 text-xs text-neutral-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemove(item.code)
                      }}
                      className="text-neutral-300 cursor-pointer hover:text-destructive transition-colors shrink-0"
                      aria-label="Remove from history"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
