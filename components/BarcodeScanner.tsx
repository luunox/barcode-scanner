"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { motion } from "framer-motion"
import { X, Camera, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"

interface BarcodeScannerProps {
  onScan: (code: string) => void
  onClose: () => void
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(true)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const startScanning = useCallback(async () => {
    // Prevent starting if already running or unmounted
    if (scannerRef.current) return

    try {
      setError(null)
      const scanner = new Html5Qrcode("reader")
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
           scanner.stop().then(() => {
             // Clear scanner instance
             scannerRef.current = null
             onScan(decodedText)
           }).catch(console.error)
        },
        (errorMessage) => {
          // ignore parsing errors
        }
      )
      setIsScanning(true)
    } catch (err: any) {
      console.error("Failed to start scanner", err)
      setIsScanning(false)
      // Show concrete error
      const errorMessage = err?.message || err?.toString() || "Error desconocido"
      setError(`No se pudo iniciar la cámara: ${errorMessage}`)
      
      // Cleanup if failed start
      if (scannerRef.current) {
        try {
           await scannerRef.current.clear()
        } catch (e) { console.error(e) }
        scannerRef.current = null
      }
    }
  }, [onScan])

  useEffect(() => {
    // Tiny delay to ensure DOM is ready
    const timer = setTimeout(() => {
      startScanning()
    }, 100)

    return () => {
      clearTimeout(timer)
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.warn).finally(() => {
          try {
              scannerRef.current?.clear()
          } catch (e) { console.warn(e) }
          scannerRef.current = null
        })
      }
    }
  }, [startScanning])

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 z-50">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="w-full max-w-md px-4 relative flex flex-col items-center gap-6">
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-black/40 border border-white/20 shadow-2xl">
            <div id="reader" className="w-full h-full" />
            
            {/* Overlay guides */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                <div className="w-64 h-64 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                    
                    <motion.div 
                        initial={{ top: "10%" }}
                        animate={{ top: "90%" }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "linear", 
                            repeatType: "reverse" 
                        }}
                        className="absolute left-2 right-2 h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                    />
                </div>
            </div>
        </div>

        <div className="text-center space-y-4 px-6 text-white w-full max-w-sm">
            <p className="text-sm text-neutral-300">
            Apunta la cámara a un código de barras para escanear
            </p>
            {error && (
                <div className="bg-destructive/20 text-destructive p-3 rounded-lg text-sm border border-destructive/30 flex flex-col gap-2 items-center">
                    <span>{error}</span>
                    <Button variant="link" onClick={() => startScanning()} className="text-white underline h-auto p-0">Reintentar</Button>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
