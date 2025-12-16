import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, TrendingUp, Clock, Package } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

/**
 * Calculadora de Presupuestos
 * Estima el costo de impresión 3D basado en parámetros
 */

export const BudgetCalculator = () => {
  const [volume, setVolume] = useState('100')
  const [material, setMaterial] = useState('pla')
  const [quality, setQuality] = useState('standard')
  const [quantity, setQuantity] = useState([1])
  const [postProcessing, setPostProcessing] = useState('none')

  const materialPrices = {
    pla: { name: 'PLA Estándar', price: 0.05, time: 1 },
    pla_plus: { name: 'PLA+', price: 0.08, time: 1 },
    petg: { name: 'PETG', price: 0.10, time: 1.2 },
    abs: { name: 'ABS', price: 0.09, time: 1.1 },
    tpu: { name: 'TPU (Flexible)', price: 0.15, time: 1.5 },
    resin: { name: 'Resina Premium', price: 0.25, time: 0.8 }
  }

  const qualityMultipliers = {
    draft: { name: 'Borrador (0.3mm)', multiplier: 0.7, time: 0.6 },
    standard: { name: 'Estándar (0.2mm)', multiplier: 1, time: 1 },
    high: { name: 'Alta (0.15mm)', multiplier: 1.4, time: 1.5 },
    ultra: { name: 'Ultra (0.1mm)', multiplier: 2, time: 2.5 }
  }

  const postProcessingCosts = {
    none: { name: 'Sin procesamiento', cost: 0, time: 0 },
    sanding: { name: 'Lijado y acabado', cost: 15, time: 1 },
    painting: { name: 'Pintura personalizada', cost: 35, time: 2 },
    assembly: { name: 'Ensamblaje', cost: 25, time: 1.5 },
    premium: { name: 'Acabado premium completo', cost: 75, time: 4 }
  }

  const calculateTotal = () => {
    const vol = parseFloat(volume) || 0
    const mat = materialPrices[material as keyof typeof materialPrices]
    const qual = qualityMultipliers[quality as keyof typeof qualityMultipliers]
    const post = postProcessingCosts[postProcessing as keyof typeof postProcessingCosts]
    
    const materialCost = vol * mat.price * qual.multiplier
    const postCost = post.cost
    const unitCost = materialCost + postCost
    const totalCost = unitCost * quantity[0]
    
    const setupTime = 0.5
    const printTime = (vol / 10) * mat.time * qual.time
    const postTime = post.time
    const totalTimePerUnit = setupTime + printTime + postTime
    const totalTime = totalTimePerUnit * quantity[0]
    
    return {
      unitCost: unitCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      materialCost: materialCost.toFixed(2),
      postCost: postCost.toFixed(2),
      timePerUnit: totalTimePerUnit.toFixed(1),
      totalTime: totalTime.toFixed(1),
      estimatedDays: Math.ceil(totalTime / 8)
    }
  }

  const results = calculateTotal()

  const getSavings = () => {
    if (quantity[0] >= 10) {
      return { percentage: 15, amount: (parseFloat(results.totalCost) * 0.15).toFixed(2) }
    } else if (quantity[0] >= 5) {
      return { percentage: 10, amount: (parseFloat(results.totalCost) * 0.10).toFixed(2) }
    }
    return null
  }

  const savings = getSavings()

  return (
    <Card className="bg-gradient-to-br from-card via-card to-secondary/5 border-2 border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="h-6 w-6 text-secondary" />
          Calculadora de Presupuesto
        </CardTitle>
        <p className="text-muted-foreground">Estima el costo de tu proyecto de impresión 3D</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="volume">Volumen estimado (cm³)</Label>
            <Input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="100"
              min="1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              💡 Un cubo de 5cm × 5cm × 5cm = 125 cm³
            </p>
          </div>

          <div>
            <Label htmlFor="material">Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger id="material">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(materialPrices).map(([key, mat]) => (
                  <SelectItem key={key} value={key}>
                    {mat.name} (${mat.price}/cm³)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quality">Calidad de impresión</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger id="quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(qualityMultipliers).map(([key, qual]) => (
                  <SelectItem key={key} value={key}>
                    {qual.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="post">Post-procesamiento</Label>
            <Select value={postProcessing} onValueChange={setPostProcessing}>
              <SelectTrigger id="post">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(postProcessingCosts).map(([key, post]) => (
                  <SelectItem key={key} value={key}>
                    {post.name} {post.cost > 0 && `(+$${post.cost})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              Cantidad: {quantity[0]} unidades
            </Label>
            <Slider
              value={quantity}
              onValueChange={setQuantity}
              max={50}
              min={1}
              step={1}
              className="mt-2"
            />
            {quantity[0] >= 5 && (
              <p className="text-xs text-primary mt-1 font-medium">
                🎉 Descuento por volumen aplicado
              </p>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-3 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-5 border border-primary/20">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Costo por unidad:</span>
            <span className="font-semibold text-lg">${results.unitCost}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Material:</span>
            <span>${results.materialCost}</span>
          </div>
          
          {parseFloat(results.postCost) > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Post-procesamiento:</span>
              <span>${results.postCost}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground pt-2 border-t border-border">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Tiempo por unidad:</span>
            <span className="font-medium ml-auto">{results.timePerUnit} horas</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="text-sm">Tiempo total:</span>
            <span className="font-medium ml-auto">{results.totalTime} horas (~{results.estimatedDays} días)</span>
          </div>

          {savings && (
            <div className="bg-primary/20 rounded-lg p-3 mt-3 border border-primary/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Descuento por volumen: {savings.percentage}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Ahorras ${savings.amount}</p>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Total estimado:</span>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ${savings ? (parseFloat(results.totalCost) * (1 - savings.percentage / 100)).toFixed(2) : results.totalCost}
                </div>
                {savings && (
                  <div className="text-xs text-muted-foreground line-through">
                    ${results.totalCost}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Nota:</strong> Este es un cálculo estimado. El precio final puede variar según la complejidad del diseño, soportes necesarios y tiempo de impresión real.
          </p>
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
          Solicitar Cotización Exacta
        </Button>
      </CardContent>
    </Card>
  )
}