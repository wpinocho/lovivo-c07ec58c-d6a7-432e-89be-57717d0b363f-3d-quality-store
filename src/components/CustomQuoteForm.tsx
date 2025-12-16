import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUp, Send, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * Formulario de Cotización Personalizada
 * Permite a usuarios solicitar proyectos custom
 */

export const CustomQuoteForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    quantity: '1',
    urgency: 'normal'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    toast({
      title: "¡Cotización enviada!",
      description: "Te contactaremos en las próximas 24 horas con tu presupuesto.",
      duration: 4000
    })

    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      description: '',
      quantity: '1',
      urgency: 'normal'
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-accent" />
          Cotización Personalizada
        </CardTitle>
        <p className="text-muted-foreground">
          ¿Tienes un proyecto único? Cotiza tu diseño custom
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Juan Pérez"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+52 55 1234 5678"
              />
            </div>
            
            <div>
              <Label htmlFor="projectType">Tipo de proyecto *</Label>
              <Select 
                value={formData.projectType} 
                onValueChange={(val) => handleChange('projectType', val)}
                required
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prototype">Prototipo funcional</SelectItem>
                  <SelectItem value="decoration">Decoración/Arte</SelectItem>
                  <SelectItem value="replacement">Pieza de repuesto</SelectItem>
                  <SelectItem value="miniature">Miniaturas/Figuras</SelectItem>
                  <SelectItem value="architectural">Maqueta arquitectónica</SelectItem>
                  <SelectItem value="industrial">Pieza industrial</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <Label htmlFor="description">Descripción del proyecto *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe tu proyecto: dimensiones, materiales preferidos, acabados, colores, etc."
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                placeholder="1"
              />
            </div>
            
            <div>
              <Label htmlFor="urgency">Urgencia</Label>
              <Select 
                value={formData.urgency} 
                onValueChange={(val) => handleChange('urgency', val)}
              >
                <SelectTrigger id="urgency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Sin prisa (10+ días)</SelectItem>
                  <SelectItem value="normal">Normal (5-10 días)</SelectItem>
                  <SelectItem value="high">Urgente (3-5 días)</SelectItem>
                  <SelectItem value="express">Express (1-2 días) +50%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <FileUp className="h-10 w-10 text-primary mb-2" />
              <span className="text-sm font-medium text-foreground">Sube tus archivos</span>
              <span className="text-xs text-muted-foreground mt-1">
                STL, OBJ, 3MF, imágenes o PDFs (máx 50MB)
              </span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept=".stl,.obj,.3mf,.pdf,.jpg,.jpeg,.png"
              />
            </label>
          </div>

          {/* Submit */}
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90"
            size="lg"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Cotización
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            * Te responderemos en 24 horas con un presupuesto detallado
          </p>
        </form>
      </CardContent>
    </Card>
  )
}