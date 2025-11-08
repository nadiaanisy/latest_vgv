import
  React, {
  useEffect,
  useState
} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { 
  ArrowLeft,
  Quote,
  Star,
  CheckCircle,
  XCircle,
  BarChart3,
  MessageCircle,
  Instagram,
  MapPin
} from 'lucide-react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import {
//   metrics,
  whatWorked,
  successFactors,
  whatDidntWork,
  areasImprovement
} from '../../assets/constants';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { fetchTestimonials } from '../../api/get';
import { Testimonial } from '../../utils/interface';
import { useCustomHook } from '../../utils/customHooks';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface TestimonialPageProps {
  onNavigate: (page: string) => void
}

export function TestimonialPage({
  onNavigate
}: TestimonialPageProps) {
  const { t } = useCustomHook();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [fetchedTestimonials, setFetchedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  useEffect(() => {
    if (!carouselApi) return

    const autoSlide = setInterval(() => {
      carouselApi.scrollNext()
    }, 5000) // 5 seconds

    return () => clearInterval(autoSlide)
  }, [carouselApi])

  // Fetch testimonials
  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      const data = await fetchTestimonials();
      setFetchedTestimonials(data);
      setLoading(false);
    };

    loadTestimonials();
  }, []);

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
              <MessageCircle className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-sm">{t('CUSTOMER_INSIGHTS')}</Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-6">
              {t('WHAT_OUR_CUSTOMERS_SAID')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('WHAT_OUR_CUSTOMERS_SAID_SUBTITLE')}
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('KEY_PERFORMANCE_METRICS')}</h2>
            <p className="text-muted-foreground">{t('KEY_PERFORMANCE_METRICS_SUBTITLE')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            amek dari api
            {/* {metrics.map((metric, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4 ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-medium text-foreground mb-2">
                    {metric.value}
                  </div>
                  <div className="font-medium text-foreground mb-1">
                    {t(metric.label)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(metric.subtext)}
                  </div>
                </CardContent>
              </Card>
            ))} */}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('CUSTOMER_TESTIMONIALS_TITLE')}</h2>
            <p className="text-muted-foreground">{t('CUSTOMER_TESTIMONIALS_SUBTITLE')}</p>
          </div>

          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {fetchedTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex justify-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <div className="relative">
                        <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1" />
                        <p className="text-muted-foreground italic pl-5 leading-relaxed">
                          {testimonial.comment}
                        </p>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {testimonial.product}
                      </Badge>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              {t('TESTIMONIAL_CAROUSEL_INFO')}
            </p>
          </div>
        </div>
      </section>

      {/* What Worked */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Badge variant="secondary" className="text-green-700 bg-green-50">{t('SUCCESS_STORIES')}</Badge>
            </div>
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('WHAT_WORKED_TITLE')}</h2>
            <p className="text-muted-foreground">{t('WHAT_WORKED_SUBTITLE')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whatWorked.map((item, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-green-500">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">{t(item.title)}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{t(item.description)}</p>
                      <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                        {t(item.metrics)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Didn't Work */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-600" />
              <Badge variant="secondary" className="text-red-700 bg-red-50">{t('LEARNING_EXPERIENCES')}</Badge>
            </div>
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('WHAT_DIDNT_WORK_TITLE')}</h2>
            <p className="text-muted-foreground">{t('WHAT_DIDNT_WORK_SUBTITLE')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whatDidntWork.map((item, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-red-500">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                        {item.icon}
                      </div>
                      <h3 className="font-medium text-foreground">{t(item.title)}</h3>
                    </div>

                    <p className="text-muted-foreground text-sm">{t(item.description)}</p>

                    <div className="space-y-2">
                      <div className="text-xs text-red-600">
                        <strong>{t("IMPACT")}:</strong> {t(item.impact)}
                      </div>
                      <div className="text-xs text-foreground">
                        <strong>{t("LESSON")}:</strong> {t(item.lesson)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reflection Summary */}
      <section className="w-full py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-0 text-center space-y-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <Badge variant="secondary">{t('KEY_INSIGHTS')}</Badge>
              </div>

              <h2 className="text-2xl font-medium text-foreground">{t('OUR_BIGGEST_LEARNINGS')}</h2>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-medium text-foreground mb-3">{t('SUCCESS_FACTORS')}</h3>
                  {successFactors.map((item, index) => (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <span>
                            <strong>{t(item.main)}</strong>: {t(item.factor)}
                          </span>
                      </li>
                    </ul>
                  ))}
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-3">{t('AREAS_OF_IMPROVEMENT')}</h3>
                  {areasImprovement.map((item, index) => (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2 mb-3">
                        <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                        {t(item)}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}