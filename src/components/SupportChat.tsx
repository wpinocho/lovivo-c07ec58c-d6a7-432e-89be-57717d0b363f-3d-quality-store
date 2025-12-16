import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * Chat de Soporte Flotante
 * Widget de chat interactivo para atención al cliente
 */

export const SupportChat = () => {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! 👋 Soy el asistente de 3dmin. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const quickReplies = [
    "📦 Estado de mi pedido",
    "💰 Cotización personalizada",
    "🎨 Materiales disponibles",
    "⏱️ Tiempo de entrega"
  ]

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto. Mientras tanto, ¿hay algo más en lo que pueda ayudarte?",
        sender: 'bot',
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)

    toast({
      title: "Mensaje enviado",
      description: "Te responderemos en breve",
      duration: 2000
    })
  }

  const handleQuickReply = (reply: string) => {
    setMessage(reply)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform z-50"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
            1
          </span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-2 border-primary/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Soporte 3dmin</h3>
                <p className="text-xs opacity-90">En línea</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t border-border bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs hover:bg-primary/10"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}