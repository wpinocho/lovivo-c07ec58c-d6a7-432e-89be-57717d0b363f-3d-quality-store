import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Box, Layers, Ruler, DollarSign, Download, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * Configurador 3D Interactivo
 * Permite a los usuarios personalizar productos en tiempo real
 */

interface ConfiguratorProps {
  className?: string
}

export const Product3DConfigurator = ({ className }: ConfiguratorProps) => {
  const { toast } = useToast()
  const [dimensions, setDimensions] = useState({ width: 10, height: 10, depth: 10 })
  const [material, setMaterial] = useState('pla')
  const [color, setColor] = useState('#3b82f6')
  const [infill, setInfill] = useState([20])
  const [quality, setQuality] = useState('standard')

  const materials = {
    pla: { name: 'PLA Estándar', price: 0.05 },
    pla_plus: { name: 'PLA+', price: 0.08 },
    petg: { name: 'PETG', price: 0.10 },
    abs: { name: 'ABS', price: 0.09 },
    resin: { name: 'Resina Premium', price: 0.25 }
  }

  const qualities = {
    draft: { name: 'Borrador (0.3mm)', multiplier: 0.7 },
    standard: { name: 'Estándar (0.2mm)', multiplier: 1 },
    high: { name: 'Alta (0.15mm)', multiplier: 1.4 },
    ultra: { name: 'Ultra (0.1mm)', multiplier: 2 }
  }

  const calculateVolume = () => {
    return (dimensions.width * dimensions.height * dimensions.depth) / 1000 // cm³
  }

  const calculatePrice = () => {
    const volume = calculateVolume()
    const materialCost = materials[material as keyof typeof materials].price
    const qualityMultiplier = qualities[quality as keyof typeof qualities].multiplier
    const infillFactor = infill[0] / 100
    
    return (volume * materialCost * qualityMultiplier * infillFactor).toFixed(2)
  }

  const handleExport = () => {
    toast({
      title: "Configuración exportada",
      description: "Tu diseño ha sido guardado. Te contactaremos pronto.",
      duration: 3000
    })
  }

  const handlePreview = () => {
    toast({
      title: "Vista previa 3D",
      description: "Abriendo visualizador 3D...",
      duration: 2000
    })
  }

  return (
    <Card className={`bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Box className="h-6 w-6 text-primary" />
          Configurador 3D Interactivo
        </CardTitle>
        <p className="text-muted-foreground">Personaliza tu producto en tiempo real</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview 3D */}
        <div className="relative aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden group">
          <div 
            className="transition-transform duration-300 group-hover:scale-110"
            style={{
              width: `${dimensions.width * 2}%`,
              height: `${dimensions.height * 2}%`,
              backgroundColor: color,
              opacity: 0.8,
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 bg-background/90 backdrop-blur"
            onClick={handlePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista 3D
          </Button>
        </div>

        {/* Dimensiones */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-5 w-5 text-primary" />
            <Label className="text-base font-semibold">Dimensiones (cm)</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-muted-foreground">Ancho: {dimensions.width} cm</Label>
              <Slider
                value={[dimensions.width]}
                onValueChange={(val) => setDimensions({ ...dimensions, width: val[0] })}
                max={30}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-sm text-muted-foreground">Alto: {dimensions.height} cm</Label>
              <Slider
                value={[dimensions.height]}
                onValueChange={(val) => setDimensions({ ...dimensions, height: val[0] })}
                max={30}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-sm text-muted-foreground">Profundidad: {dimensions.depth} cm</Label>
              <Slider
                value={[dimensions.depth]}
                onValueChange={(val) => setDimensions({ ...dimensions, depth: val[0] })}
                max={30}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Material y Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-primary" />
              Material
            </Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(materials).map(([key, mat]) => (
                  <SelectItem key={key} value={key}>
                    {mat.name} (${mat.price}/cm³)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Color</Label>
            <div className="flex gap-2">
              {['#3b82f6', '#06b6d4', '#8b5cf6', '#ef4444', '#f59e0b', '#10b981', '#ffffff', '#000000'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    color === c ? 'border-primary scale-110' : 'border-border hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Calidad y Relleno */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-2 block">Calidad de Impresión</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(qualities).map(([key, qual]) => (
                  <SelectItem key={key} value={key}>
                    {qual.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              Relleno: {infill[0]}%
            </Label>
            <Slider
              value={infill}
              onValueChange={setInfill}
              max={100}
              min={10}
              step={5}
              className="mt-2"
            />
          </div>
        </div>

        {/* Resumen de precio */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Volumen:</span>
            <span className="font-semibold">{calculateVolume().toFixed(2)} cm³</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Precio estimado:</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ${calculatePrice()}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <Button 
            onClick={handleExport}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Download className="h-4 w-4 mr-2" />
            Solicitar Cotización
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}