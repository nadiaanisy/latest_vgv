import {
  useEffect,
  useRef,
  Key,
  useState
} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { 
  ArrowLeft, 
  MessageCircle,
  Check,
  Instagram,
  ShoppingBag,
  TestTube,
  BarChart3,
  Calendar,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  SquareArrowOutUpRight
} from 'lucide-react';
import {
  experiments,
  strategicApproach
} from '../../assets/constants';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useCustomHook } from '../../utils/customHooks';
import { handleWhatsAppOrder } from '../../functions/others';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface ProductsPageProps {
  onNavigate: (page: string) => void
  selectedProductId?: string | null
  products: any[]
}
export function ProductsPage({
  onNavigate,
  selectedProductId,
  products
}: ProductsPageProps) {
  const {
    t,
    isLoading,
    setIsLoading,
    getCurrentLanguage,
    searchQuery,
    setSearchQuery
  } = useCustomHook();
  const [optionFilter, setOptionFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (products && products.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [products, setIsLoading]);

  // Scroll to selected product when component mounts
  useEffect(() => {
    if (selectedProductId && productRefs.current[selectedProductId]) {
      const element = productRefs.current[selectedProductId]
      const yOffset = -100 // Offset for header
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [selectedProductId])

  // Filtered and paginated products
  const filteredProducts = products.filter(product =>
    (product.name.EN.toLowerCase().includes(searchQuery.toLowerCase()) || product.name.BM.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (optionFilter === 'all' || (optionFilter === 'yes' && product.hasOptions) || (optionFilter === 'no' && !product.hasOptions)) &&
    (priceFilter === 'all' || (priceFilter === 'low' && product.salePrice < 100) || (priceFilter === 'high' && product.salePrice >= 100))
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, optionFilter, priceFilter])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setOptionFilter('all')
    setPriceFilter('all')
    setCurrentPage(1)
  }

  const activeFiltersCount = [
    searchQuery !== '',
    // categoryFilter !== 'all',
    priceFilter !== 'all'
  ].filter(Boolean).length

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="w-full py-12 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('BUTTONS.BACK_TO_HOME')}
            </Button>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-sm">{t('OUR_PRODUCTS')}</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-6">
              {t('PRODUCTS_WE_ARE_SELLING')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('PRODUCTS_WE_ARE_SELLING_SUBTITLE')}
            </p>
            
            {/* Strong Call-to-Action */}
            <div className="bg-white/80 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">{t('LIMITED_TIME_OFFER')}</Badge>
              </div>
              <Button 
                size="lg" 
                className="gap-2 bg-green-600 hover:bg-green-700"
                onClick={() => handleWhatsAppOrder("products", "", "any Wetty product", "special university pricing")}
              >
                <MessageCircle className="w-5 h-5" />
                {t('BUTTONS.ORDER_NOW_VIA_WHATSAPP')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('OUR_PRODUCT_LINE')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('OUR_PRODUCT_LINE_SUBTITLE')}
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="mb-8 border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">{t('FILTER_PRODUCTS')}</h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {activeFiltersCount} {t('ACTIVE')}
                    </Badge>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearFilters}
                    className="gap-2"
                    style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    <X className="w-4 h-4" />
                    {t('BUTTONS.CLEAR_ALL')}
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="search">{t('SEARCH_PRODUCTS')}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="search" 
                      type="text" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('PLACEHOLDERS.SEARCH_PRODUCTS_V2')}
                      style={{paddingLeft: '40px'}}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hasOption">{t('PRODUCT_HAS_OPTIONS')}</Label>
                  <Select 
                    value={optionFilter} 
                    onValueChange={(value) => setOptionFilter(value)}
                  >
                    <SelectTrigger id="hasOption">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('ALL')}</SelectItem>
                      <SelectItem value="yes">{t('YES')}</SelectItem>
                      <SelectItem value="no">{t('NO')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t('PRICE_RANGE')}</Label>
                  <Select 
                    value={priceFilter} 
                    onValueChange={(value) => setPriceFilter(value)}
                  >
                    <SelectTrigger id="price">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('ALL_PRICES')}</SelectItem>
                      <SelectItem value="low">{t('UNDER_RM100')}</SelectItem>
                      <SelectItem value="high">{t('RM100_AND_ABOVE')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <div></div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="itemsPerPage" className="text-sm">{t('ITEMS_PER_PAGE')}</Label>
                  <Select 
                    value={itemsPerPage.toString()} 
                    onValueChange={(value) => {
                      setItemsPerPage(parseInt(value))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger id="itemsPerPage" className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          {filteredProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-2">{t('NO_PRODUCTS_FOUND')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('TRY_ADJUSTING_FILTERS')}
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    {t('BUTTONS.CLEAR_FILTERS')}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-12">
              {paginatedProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  ref={(el) => { 
                    if (product.id) {
                      productRefs.current[product.id] = el;
                    }
                  }}
                  className={`overflow-hidden hover:shadow-lg transition-shadow ${
                    selectedProductId === product.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-square relative overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM }
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="bg-white rounded-lg p-2 shadow-lg">
                            <div className="text-lg font-medium text-foreground">{product.priceRange}</div>
                            <div className="text-sm text-muted-red line-through">RM{(product.originalPrice).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-2">{getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM}</h3>
                          <p className="text-muted-foreground">{getCurrentLanguage().code === 'EN' ? t(product.description_long.EN) : t(product.description_long.BM)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-3">{t('WHY_WE_CHOSE_THIS_PRODUCT')}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {getCurrentLanguage().code === 'EN' ? t(product.whyChosen.EN) : t(product.whyChosen.BM)}
                          </p>
                          <h4 className="font-medium text-foreground mb-3">Target:</h4>
                          {getCurrentLanguage().code === 'EN' ? product.targetMarket.EN.map((target: any, index: Key | null | undefined) => (
                            <Badge key={`${product.id}-target-${target}`} variant="outline" className="text-xs">
                              {t(target)}
                            </Badge>
                          )) : product.targetMarket.BM.map((target: any, index: Key | null | undefined) => (
                            <Badge key={`${product.id}-target-${target}`} variant="outline" className="text-xs">
                              {t(target)}
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-3">{t('KEY_FEATURES')}</h4>
                          <ul className="space-y-2">
                            {getCurrentLanguage().code === 'EN' ? product.benefits.EN.map((benefit: any, idx: number) => (
                              <li key={`${product.id}-benefit-${benefit}`} className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{t(benefit)}</span>
                              </li>
                            )) : product.benefits.BM.map((benefit: any, idx: number) => (
                              <li key={`${product.id}-benefit-${benefit}`} className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{t(benefit)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {product.hasOptions ? (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="w-full sm:flex-1"
                                  size="lg"
                                >
                                  <Eye className="w-5 h-5" />
                                  {t('BUTTONS.VIEW_OPTIONS')}
                                </Button>
                              </DialogTrigger>
                              <DialogContent
                                className="max-w-md"
                                aria-describedby={undefined}
                                onPointerDownOutside={(e) => e.preventDefault()}
                                onInteractOutside={(e) => e.preventDefault()}
                              >
                                <DialogHeader className="sticky top-0 z-10 bg-background py-4 border-b">
                                  <DialogTitle>{getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM}</DialogTitle>
                                  <DialogDescription>{t('OPTION_SUBTITLE')}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {product.options?.map((option: any, idx: number) => (
                                      <Card key={`${product.id}-option-${option.id || option.name}`} className="p-4">
                                      <div className="space-y-3 grid md:grid-cols-2 md:gap-[0.75rem]">
                                        <div className="aspect-square rounded-lg overflow-hidden">
                                          <ImageWithFallback
                                            src={option.image}
                                            alt={getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-lg">{getCurrentLanguage().code === 'EN' ? option.name?.EN ?? '' : option.name?.BM ?? ''}</h4>
                                          {option.description && (
                                            <p className="text-sm text-muted-foreground">{getCurrentLanguage().code === 'EN' ? t(option.description.EN) ?? '' : t(option.description.BM) ?? ''}</p>
                                          )}
                                          <div className="flex flex-row md:flex-col md:gap-[0.75rem] items-center md:items-stretch justify-between">
                                            <div>
                                              <span className="text-sm text-muted-red line-through">{option.originalPrice !== 'NaN' ? 'RM' + t((option.originalPrice).toFixed(2)) : 'RM0.00'}</span>
                                              <span className="ml-2 text-lg font-medium text-primary">{option.salePrice !== 'NaN' ? 'RM' + t((option.salePrice).toFixed(2)) : 'RM0.00'}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                              <Button 
                                                className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                                                onClick={() => window.open(option.shopeeLink, "_blank")}
                                              >
                                                {t('BUTTONS.ORDER_NOW')}
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              onClick={() => handleWhatsAppOrder('products', '', getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM, product.priceRange)}
                              className="w-full sm:flex-1 bg-green-600 hover:bg-green-700"
                              size="lg"
                            >
                              <MessageCircle className="w-5 h-5" />
                              {t('BUTTONS.INQUIRIES')}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <Button
                              onClick={() => window.open(product.shopeeLink, "_blank")}
                              className="flex-1 gap-2 bg-[#fd7e14]"
                              size="lg"
                            >
                              <SquareArrowOutUpRight className="w-5 h-5" />
                              {t('BUTTONS.ORDER_NOW')}
                            </Button>
                            <Button
                              onClick={() => handleWhatsAppOrder('products', '', getCurrentLanguage().code === 'EN' ? product.name.EN : product.name.BM, product.priceRange)}
                              className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                              size="lg"
                            >
                              <MessageCircle className="w-5 h-5" />
                              {t('BUTTONS.INQUIRIES')}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <Card className="mt-8 border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {t('SHOWING')} {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} {t('OF')} {filteredProducts.length} {t('PRODUCTS')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t('BUTTONS.PREVIOUS')}
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page ? "" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {t('BUTTONS.NEXT')}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Pricing, Promotion & Distribution Strategy */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <Badge variant="secondary">{t('SELLING_STRATEGY')}</Badge>
            </div>
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('OUR_STRATEGIC_APPROACH')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('OUR_STRATEGIC_APPROACH_DESC')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {strategicApproach.map((approach, index) => (
              <Card key={`strategy-${index}`} className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      {approach.icon}
                    </div>
                    <span>{t(approach.title)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t(approach.description)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Experiments */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <TestTube className="w-5 h-5 text-primary" />
              <Badge variant="secondary">{t('EXPERIMENTS_AND_TESTING')}</Badge>
            </div>
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('WHAT_WEVE_TRIED')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('REAL_EXPERIMENTS_DESCRIPTION')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiments.map((experiment, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {experiment.icon}
                    </div>
                    <div>
                      <div className="text-lg">{t(experiment.title)}</div>
                      <div className="text-sm text-muted-foreground font-normal">{t(experiment.period)}</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {t(experiment.description)}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-foreground text-sm mb-2">{t('RESULTS')}:</h4>
                    <p className="text-sm text-muted-foreground">{t(experiment.results_one)}</p>
                    <p className="text-sm text-muted-foreground">{t(experiment.results_two)}</p>
                    {experiment.results_three && (
                      <p className="text-sm text-muted-foreground">
                        {t(experiment.results_three)}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground text-sm mb-2">{t('KEY_LEARNINGS')}:</h4>
                    <p className="text-sm text-muted-foreground">{t(experiment.learnings)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="w-full py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="p-8 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0 space-y-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <Badge variant="secondary">{t('LIMITED_TIME')}</Badge>
              </div>

              <h3 className="text-2xl font-medium text-foreground">{t('READY_TO_EXPERIENCE_THE_PRODUCT')}</h3>

              <p className="text-muted-foreground leading-relaxed">
                {t('READY_TO_EXPERIENCE_THE_PRODUCT_SUBTITLE')}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Button 
                  size="lg" 
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleWhatsAppOrder("any Wetty product", "university pricing")}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('BUTTONS.ORDER_VIA_WHATSAPP')}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-2 border-[#0000001a]"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  onClick={() => window.open('https://instagram.com/wettyventures', '_blank')}
                >
                  <Instagram className="w-5 h-5" />
                  {t('BUTTONS.FOLLOW_ON_INSTAGRAM')}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ {t('FREE_SHIPPING_OVER_RM50')}</p>
                <p>✓ {t('100%_SATISFACTION_GUARANTEE')}</p>
                <p>✓ {t('SPECIAL_PRICE_AGENT_BULK')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}