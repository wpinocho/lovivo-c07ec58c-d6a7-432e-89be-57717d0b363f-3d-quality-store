import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Product3DConfigurator } from '@/components/Product3DConfigurator';
import { ARPreview } from '@/components/ARPreview';
import { SupportChat } from '@/components/SupportChat';
import { CustomQuoteForm } from '@/components/CustomQuoteForm';
import { BudgetCalculator } from '@/components/BudgetCalculator';
import { InteractiveFeaturesShowcase } from '@/components/InteractiveFeaturesShowcase';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { InteractiveFAQ } from '@/components/InteractiveFAQ';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 border-b">
        <div className="absolute inset-0 bg-[url('https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/c07ec58c-d6a7-432e-89be-57717d0b363f/hero-3d.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-in fade-in duration-700">
            Impresión 3D de Alta Calidad
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto animate-in fade-in duration-700 delay-150">
            Descubre productos únicos impresos en 3D con PLA y resina premium. Diseños exclusivos, calidad excepcional y envío rápido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in duration-700 delay-300">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Explorar Productos
            </Button>
            {collections.length > 0 && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary hover:bg-primary/10"
                onClick={() => {
                  document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Ver Colecciones
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Nuestras Colecciones
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explora nuestras categorías de productos impresos en 3D
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Features Showcase */}
      <InteractiveFeaturesShowcase />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Productos' 
                  : 'Productos Destacados'
                }
              </h2>
              <p className="text-muted-foreground">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.description || '' 
                  : 'Descubre nuestra selección de productos premium'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver Todos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section id="interactive-tools" className="py-16 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Herramientas Interactivas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Configura, visualiza y cotiza tus proyectos 3D con nuestras herramientas avanzadas
            </p>
          </div>

          {/* Configurador y Calculadora en grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Product3DConfigurator />
            <BudgetCalculator />
          </div>

          {/* Formulario de cotización */}
          <div className="mt-8">
            <CustomQuoteForm />
          </div>
        </div>
      </section>

      {/* Interactive FAQ */}
      <InteractiveFAQ />

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
      <SupportChat />
    </EcommerceTemplate>
  );
};