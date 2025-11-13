import {
  useEffect,
  useState
} from 'react';
import {
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useCustomHook } from '../../utils/customHooks';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface ProductSliderProps {
  onNavigate: (page: string, productId?: string) => void
  products: any[]
}
export function ProductSlider({ 
  onNavigate,
  products
}: ProductSliderProps) {
  const { 
    t,
    isLoading,
    setIsLoading,
    getCurrentLanguage
  } = useCustomHook();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [products, setIsLoading]);

  const nextSlide = () => {
    if (!products.length) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevSlide = () => {
    if (!products.length) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [products])

  const currentProduct = products[currentIndex];

  function ProductSliderSkeleton() {
    return (
      <div className="relative animate-pulse">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="h-[500px] w-full bg-gray-200" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>
        <div className="absolute top-[65%] flex items-end p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md shadow-lg w-[90%]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-3/4 h-5 bg-gray-300 rounded mb-3"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !products.length) {
    return <ProductSliderSkeleton />;
  }

  return (
    <div className="relative">
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="relative h-[500px]">
          {/* Background image */}
          <ImageWithFallback
            src={currentProduct?.image}
            alt={getCurrentLanguage().code === 'EN' ? currentProduct?.name.EN : currentProduct?.name.BM}
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute top-[65%] flex items-end p-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-md shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {currentProduct.category ?? 'N/A'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {t('FEATURED_PRODUCT')}
            </Badge>
          </div>
          
          <h3 className="text-xl font-medium text-foreground mb-2">
            {getCurrentLanguage().code === 'EN' ? currentProduct.name.EN : currentProduct.name.BM}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {getCurrentLanguage().code === 'EN' ? currentProduct.description_short.EN : currentProduct.description_short.BM}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium text-primary">
              {currentProduct.priceRange}
            </div>
            <Button 
              size="sm"
              className="gap-2"
              onClick={() => onNavigate('products', currentProduct.id?.toString())}
            >
              <Eye className="w-4 h-4" />
              {t('BUTTONS.VIEW_PRODUCTS')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-[75%] -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-[75%] -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      {/* Slide indicators */}
      <div className="relative top-[155px] md:top-[130px] flex justify-center gap-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-primary' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Product counter */}
      <div className="relative top-[155px] md:top-[130px] text-center mt-2">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} {t('OF')} {products.length}
        </p>
      </div>
    </div>
  )
}