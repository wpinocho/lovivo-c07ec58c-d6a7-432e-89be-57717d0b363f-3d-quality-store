import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Smartphone, Camera, QrCode, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * Preview en Realidad Aumentada
 * Permite a los usuarios visualizar productos en su espacio
 */

interface ARPreviewProps {
  productName?: string
  productImage?: string
}

export const ARPreview = ({ productName = "Producto 3D", productImage }: ARPreviewProps) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleARView = () => {
    toast({
      title: "Iniciando AR",
      description: "Apunta tu cámara al espacio donde quieres ver el producto",
      duration: 3000
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 border-primary/50 hover:bg-primary/10 hover:border-primary"
        >
          <Camera className="h-4 w-4" />
          Ver en AR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Realidad Aumentada
          </DialogTitle>
          <DialogDescription>
            Visualiza "{productName}" en tu espacio real
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Image */}
          {productImage && (
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
              <img 
                src={productImage} 
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* QR Code mockup */}
          <Card className="p-6 bg-gradient-to-br from-card to-muted">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-lg mx-auto">
                <QrCode className="h-32 w-32 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Escanea con tu móvil para ver en AR
              </p>
            </div>
          </Card>

          {/* Instructions */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Cómo usar AR:
            </h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Escanea el código QR con tu móvil</li>
              <li>Permite acceso a la cámara</li>
              <li>Apunta a una superficie plana</li>
              <li>Mueve el producto y ajusta el tamaño</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleARView}
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
            >
              <Camera className="h-4 w-4 mr-2" />
              Abrir en dispositivo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}