"use client"

import { useState } from "react"
import { Search, Scan, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchFormProps {
  onSearch: (code: string) => void
  onToggleScanner: () => void
  isLoading: boolean
  className?: string
}

export function SearchForm({ onSearch, onToggleScanner, isLoading, className }: SearchFormProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!code.trim()) {
      setError("Por favor ingresa un código de barras")
      return
    }
    
    if (!/^\d{6,13}$/.test(code.trim())) {
      setError("El código debe tener entre 6 y 13 dígitos")
      return
    }

    setError("")
    onSearch(code.trim())
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="Ingresa código (ej. 7501055363803)"
            value={code}
            onChange={(e) => {
              // Only allow numbers
              const val = e.target.value.replace(/\D/g, '')
              setCode(val)
              if (error) setError("")
            }}
            className={cn("pr-10", error && "border-destructive focus-visible:ring-destructive")}
          />
          {error && <p className="absolute -bottom-5 left-0 text-xs text-destructive">{error}</p>}
        </div>
        <Button type="submit" disabled={isLoading || !code}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O escanear con cámara</span>
        </div>
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={onToggleScanner} type="button">
        <Scan className="h-4 w-4" />
        Iniciar Escáner
      </Button>
    </div>
  )
}
