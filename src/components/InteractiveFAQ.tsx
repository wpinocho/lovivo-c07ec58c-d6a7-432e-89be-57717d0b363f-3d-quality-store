import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, HelpCircle } from 'lucide-react'

/**
 * FAQ sobre Herramientas Interactivas
 * Preguntas frecuentes sobre configuración y uso
 */

export const InteractiveFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cómo funciona el Configurador 3D?",
      answer: "El Configurador 3D te permite personalizar tu producto en tiempo real. Ajusta dimensiones usando los sliders, selecciona materiales del menú desplegable, elige colores con la paleta, y define la calidad de impresión. El precio se actualiza automáticamente según tus selecciones."
    },
    {
      question: "¿Qué es la Vista AR y cómo la uso?",
      answer: "La Realidad Aumentada (AR) te permite ver cómo se vería el producto en tu espacio real antes de comprarlo. Escanea el código QR con tu smartphone, permite acceso a la cámara, y apunta a una superficie plana. Podrás mover y rotar el producto virtualmente."
    },
    {
      question: "¿La Calculadora de Presupuesto es exacta?",
      answer: "La calculadora proporciona estimaciones precisas basadas en volumen, material y calidad. Sin embargo, el precio final puede variar según la complejidad del diseño, soportes necesarios y tiempo real de impresión. Para proyectos complejos, solicita una cotización exacta."
    },
    {
      question: "¿Qué materiales están disponibles?",
      answer: "Ofrecemos PLA estándar y PLA+ (más resistente), PETG (resistente al calor), ABS (industrial), TPU (flexible) y Resina Premium para detalles ultra-finos. Cada material tiene diferentes propiedades, precios y tiempos de impresión."
    },
    {
      question: "¿Cómo solicito una cotización personalizada?",
      answer: "Usa el formulario de Cotización Custom para proyectos únicos. Incluye descripción detallada, sube tus archivos STL/OBJ o imágenes de referencia, especifica cantidad y urgencia. Te responderemos en 24 horas con un presupuesto detallado y tiempo de entrega."
    },
    {
      question: "¿Qué descuentos por volumen están disponibles?",
      answer: "Ofrecemos descuentos automáticos: 10% de descuento en pedidos de 5-9 unidades, y 15% de descuento en pedidos de 10+ unidades. Los descuentos se aplican automáticamente en la calculadora y al finalizar tu compra."
    },
    {
      question: "¿El Chat de Soporte está disponible 24/7?",
      answer: "El chat con IA está disponible 24/7 para respuestas instantáneas. Para consultas complejas, nuestro equipo humano responde en horario de lunes a viernes de 9 AM a 6 PM. Puedes dejar mensajes fuera de horario y te responderemos al siguiente día hábil."
    },
    {
      question: "¿Puedo modificar mi pedido después de solicitarlo?",
      answer: "Sí, puedes solicitar cambios contactando a soporte antes de que inicie la impresión. Una vez iniciada la producción, los cambios significativos pueden requerir cancelar y crear un nuevo pedido. Te recomendamos usar el Configurador 3D y AR para asegurar todo antes de ordenar."
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestras herramientas interactivas
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="border-border hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                >
                  <h3 className="font-semibold text-foreground pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 text-muted-foreground animate-in fade-in duration-300">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">¿Más preguntas?</h3>
          <p className="text-muted-foreground mb-4">
            Nuestro equipo está aquí para ayudarte
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="#interactive-tools"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Usar Chat en Vivo
            </a>
            <a 
              href="#interactive-tools"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}