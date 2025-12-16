import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Box, Camera, MessageCircle, FileText, Calculator } from 'lucide-react'

/**
 * Showcase de Features Interactivas
 * Destaca las herramientas disponibles en la tienda
 */

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export const InteractiveFeaturesShowcase = () => {
  const features: Feature[] = [
    {
      icon: <Box className="h-8 w-8" />,
      title: "Configurador 3D",
      description: "Personaliza dimensiones, materiales y calidad de impresión en tiempo real",
      color: "from-primary to-primary/80"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Vista AR",
      description: "Visualiza productos en tu espacio real usando realidad aumentada",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Calculadora",
      description: "Estima costos y tiempos de impresión con descuentos por volumen",
      color: "from-accent to-accent/80"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Cotización Custom",
      description: "Solicita presupuestos para proyectos personalizados con formulario completo",
      color: "from-primary via-secondary to-accent"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Chat en Vivo",
      description: "Soporte instantáneo con respuestas rápidas y asistencia personalizada",
      color: "from-secondary to-accent"
    }
  ]

  const scrollToTools = () => {
    const toolsSection = document.getElementById('interactive-tools')
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Tecnología a tu Servicio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Herramientas interactivas avanzadas para diseñar, visualizar y cotizar tus proyectos 3D
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="group bg-card border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={scrollToTools}
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 shadow-lg text-lg px-8"
          >
            Explorar Herramientas
          </Button>
        </div>
      </div>
    </section>
  )
}