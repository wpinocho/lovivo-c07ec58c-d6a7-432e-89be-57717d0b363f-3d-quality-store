import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Upload, Settings, Eye, ShoppingCart } from 'lucide-react'

/**
 * Sección "Cómo Funciona"
 * Explica el proceso de pedido personalizado paso a paso
 */

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "1. Sube tu diseño",
      description: "Comparte tu archivo STL, OBJ o imágenes de referencia. También puedes elegir de nuestro catálogo.",
      color: "from-primary to-primary/80"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "2. Personaliza",
      description: "Ajusta dimensiones, materiales, colores y calidad usando nuestro configurador interactivo.",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "3. Visualiza en AR",
      description: "Ve tu producto en realidad aumentada antes de ordenar. Asegúrate de que sea perfecto.",
      color: "from-accent to-accent/80"
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "4. Ordena y recibe",
      description: "Confirma tu pedido, recibe actualizaciones y espera tu impresión 3D de alta calidad.",
      color: "from-primary via-secondary to-accent"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            ¿Cómo Funciona?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            De la idea a la realidad en 4 simples pasos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <Card className="h-full bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white mb-4`}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow connector (hidden on last item and mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Proyectos Completados" },
            { value: "98%", label: "Satisfacción" },
            { value: "24h", label: "Respuesta Promedio" },
            { value: "15+", label: "Materiales Disponibles" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}