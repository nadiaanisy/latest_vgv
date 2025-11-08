import {
  Star,
  List,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ProductSlider } from './ProductSlider';
import { useCustomHook } from '../../utils/customHooks';
import { handleWhatsAppOrder } from '../../functions/others';

interface MainProps {
  onNavigate: (page: string, productId?: string) => void
}
export function Main({ onNavigate }: MainProps) {
  const { t } = useCustomHook();

  return (
    <section className="w-full bg-gradient-to-br from-primary/5 to-primary/10 pt-5 md:pt-16 pb-4 md:pb-[136px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* One-sentence Value Proposition */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-primary" />
                <Badge variant="secondary">{t('STAR_TITLE')}</Badge>
              </div>
              <h2 className="text-4xl lg:text-5xl font-medium text-foreground leading-tight">
                {t('START_HEADLINE_TITLE')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg">
                {t('START_HEADLINE_SUBTITLE')}
              </p>
            </div>

            {/* Strong Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 py-3 gap-2 bg-green-600 hover:bg-green-700" onClick={() => handleWhatsAppOrder('home')}>
                <MessageCircle className="w-5 h-5" />
                {t('BUTTONS.ORDER_VIA_WHATSAPP')}
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 gap-2" onClick={() => onNavigate('products')}>
                <List className="w-5 h-5" />
                {t('BUTTONS.VIEW_PRODUCTS')}
              </Button>
            </div>
          </div>

          {/* Hero Product Slider showing Wetty product range */}
          <div className="relative">
            <ProductSlider onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </section>
  )
}