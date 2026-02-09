"use client"

import Script from "next/script"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, RefreshCw, AlertCircle } from "lucide-react"

// Importaciones de assets (manejados por Webpack)
import mindFile from "../assets/target/menu.mind"
import piggletModel from "../assets/models/pigglet.glb"

// Definición de los items del menú
const menuItems = [
  {
    name: "Entrada",
    modelPath: piggletModel, 
    scale: "1 1 1",
    rotation: "90 0 0"
  },
]

export default function ArPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [scriptLoaded, setScriptLoaded] = useState({ aframe: false, mindar: false })
  const containerRef = useRef<HTMLDivElement>(null)

  // Limpieza al salir
  useEffect(() => {
    return () => {
      const video = document.querySelector('video')
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleBack = () => {
    window.location.href = "/"
  }

  // Verificar carga de scripts
  useEffect(() => {
    if (scriptLoaded.aframe && scriptLoaded.mindar) {
        // Pequeño delay para asegurar que A-Frame se inicialice antes de renderizar la escena
        setTimeout(() => setStatus('ready'), 500)
    }
  }, [scriptLoaded])

  // Manejadores de eventos de la escena AR
  useEffect(() => {
    if (status !== 'ready') return

    const sceneEl = document.querySelector('a-scene')
    if (!sceneEl) return

    const onArError = (event: any) => {
        console.error("Error en MindAR:", event)
        setStatus('error')
    }

    const onArReady = () => {
        console.log("MindAR Ready")
        // Aquí podríamos ocultar un loader específico si tuviéramos uno superpuesto
    }

    sceneEl.addEventListener("arError", onArError)
    sceneEl.addEventListener("arReady", onArReady)

    return () => {
        sceneEl.removeEventListener("arError", onArError)
        sceneEl.removeEventListener("arReady", onArReady)
    }
  }, [status])

  const capturePhoto = () => {
    const sceneEl = document.querySelector('a-scene') as any
    if (sceneEl && sceneEl.components && sceneEl.components.screenshot) {
        const canvas = sceneEl.components.screenshot.getCanvas('perspective')
        const dataURL = canvas.toDataURL("image/png")
        
        const link = document.createElement('a')
        link.download = `menu-ar-${Date.now()}.png`
        link.href = dataURL
        link.click()
    } else {
        console.warn("Componente de screenshot no disponible")
    }
  }

  // Construcción del HTML de la escena dinámicamente
  const buildSceneHtml = () => {
    const assetsHtml = menuItems.map((item, index) => 
        `<a-asset-item id="model-${index}" src="${item.modelPath}"></a-asset-item>`
    ).join('')

    const entitiesHtml = menuItems.map((item, index) => `
        <a-entity mindar-image-target="targetIndex: ${index}">
            <a-gltf-model 
                src="#model-${index}" 
                scale="${item.scale}" 
                rotation="${item.rotation}" 
                position="0 0 0">
            </a-gltf-model>
        </a-entity>
    `).join('')

    // Usamos el archivo .mind definido
    // Nota: preserveDrawingBuffer: true es importante para capturas de pantalla en WebGL
    return `
      <a-scene 
        screenshot 
        mindar-image="imageTargetSrc: ${mindFile}; autoStart: true; uiLoading: no; uiError: no;" 
        embedded 
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights; preserveDrawingBuffer: true;" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      >
        <a-assets>
            ${assetsHtml}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        ${entitiesHtml}

        <a-light type="ambient" intensity="0.7"></a-light>
        <a-light type="directional" position="0 2 1" intensity="0.5"></a-light>
      </a-scene>
    `
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden" ref={containerRef}>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        /* Forzar video y canvas a pantalla completa y centrados */
        video, canvas.a-canvas {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          margin: auto !important;
        }
        /* Asegurar que el tracking de MindAR no se rompa visualmente */
        .mindar-ui-overlay {
            display: none !important;
        }
      `}</style>

      {/* Scripts Globales */}
      <Script
        src="https://aframe.io/releases/1.5.0/aframe.min.js"
        onLoad={() => setScriptLoaded(prev => ({ ...prev, aframe: true }))}
        onError={() => setStatus('error')}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"
        onLoad={() => setScriptLoaded(prev => ({ ...prev, mindar: true }))}
        onError={() => setStatus('error')}
      />

      {/* Botón Volver */}
      <div className="absolute top-4 left-4 z-2000 flex gap-2">
         <button onClick={handleBack} className="bg-white/90 p-3 rounded-full text-black shadow-lg hover:bg-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
         </button>
      </div>

      {/* Estados de Carga / Error */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2000 pointer-events-none">
            {status === 'loading' && (
                <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-xl flex flex-col items-center gap-3 shadow-2xl">
                    <RefreshCw className="animate-spin w-8 h-8 text-primary" />
                    <span className="font-medium text-neutral-800">Cargando Menú 3D...</span>
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-50 px-6 py-4 rounded-xl flex items-center gap-3 border border-red-200 shadow-xl">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <span className="text-red-700 font-medium">Error al cargar AR</span>
                </div>
            )}
       </div>

      {/* Botón de Captura (Solo visible cuando está listo) */}
      {status === 'ready' && (
        <div className="absolute bottom-8 left-0 right-0 z-2000 flex justify-center p-4">
            <button 
                onClick={capturePhoto} 
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition active:scale-95"
            >
                <Camera className="w-5 h-5" />
                TOMAR FOTO
            </button>
        </div>
      )}

      {/* Escena AR */}
      {status === 'ready' && (
        <div className="absolute inset-0 z-0" dangerouslySetInnerHTML={{ __html: buildSceneHtml() }} />
      )}
    </div>
  )
}
