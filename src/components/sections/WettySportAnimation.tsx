import {
  Card,
  CardContent
} from '../ui/card';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  Share2,
  Check,
  Zap,
  Shield,
  Users,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useCustomHook } from '../../utils/customHooks';
import { handleWhatsAppOrder } from '../../functions/others';
import videoFile from '../../assets/video/Wetty_Sport_Wipes_Sample.mp4';

interface WettySportAnimationProps {
  onNavigate: (page: string) => void
}

export function WettySportAnimation({ onNavigate }: WettySportAnimationProps) {
  const { t } = useCustomHook();

  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wetty Sport Animation - Freshness That Moves With You',
          text: 'Check out this amazing animation showcasing Wetty Sport Wet Tissue!',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const handleEnded = () => setIsPlaying(false);

    videoRef.current.addEventListener("ended", handleEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => videoRef.current?.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const setVideoDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", setVideoDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", setVideoDuration);
    };
  }, []);

  return (
    <main className="min-h-screen bg-ultra-light-green">
      {/* Header */}
      <section className="w-full py-6 bg-gradient-to-br from-primary/5 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('products')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('BUTTONS.BACK_TO_PRODUCTS')}
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t('BUTTONS.SHARE')}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section
        className="w-full py-12"
        style={{
          background: 'linear-gradient(to bottom right, rgba(122, 234, 24, 0.05), rgba(143, 30, 174, 0.05))'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              {t('FEATURED_ANIMATION')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-medium text-foreground mb-4">
              Wetty Sports Wipes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('ANIMATION_TITLE')}
            </p>
          </div>

          {/* Video Player Card */}
          <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
            <div
              className="relative aspect-[4/3]"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(143, 30, 174, 0.2), rgba(122, 234, 24, 0.2))",
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                src={videoFile}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted={isMuted}
                onClick={togglePlay}
              />

              {/* Video Controls Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                }}
              >
                {/* Left Side Controls */}
                <div className="flex items-center gap-3">
                  {/* Play / Pause */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>

                  {/* Mute */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-white/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>

                  {/* Time Display (Static for now) */}
                  <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>

                {/* Fullscreen Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={() => videoRef.current?.requestFullscreen()}
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>          
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button 
              size="lg" 
              className="gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => handleWhatsAppOrder('animation', 'I would like to order Wetty Sport Wet Tissue from the animation page', 'Wetty Sport', 'RM3.90')}
            >
              <MessageCircle className="w-5 h-5" />
              {t('BUTTONS.ORDER_VIA_WHATSAPP')}
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="gap-2"
              onClick={() => onNavigate('products')}
            >
              <ShoppingBag className="w-5 h-5" />
              {t('BUTTONS.VIEW_PRODUCT_DETAILS')}
            </Button>
          </div>
        </div>
      </section>

      {/* Storyboard Scenes */}
      {/* <section className="w-full py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">Animation Storyboard</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the story behind our 60-second energetic animation showcasing Wetty Sport Wet Tissue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                scene: "Scene 1-2",
                title: "The Challenge",
                description: "Athletes pushing their limits face sweat, dirt, and discomfort",
                icon: <Zap className="w-6 h-6" />
              },
              {
                scene: "Scene 3",
                title: "Product Reveal",
                description: "Introducing Wetty Sport with a stunning 3D rotation and splash effect",
                icon: <Shield className="w-6 h-6" />
              },
              {
                scene: "Scene 4-6",
                title: "Key Features",
                description: "Instant refresh, 99.9% antibacterial protection, and sweat-control formula",
                icon: <Check className="w-6 h-6" />
              },
              {
                scene: "Scene 7",
                title: "Portability",
                description: "Compact design that fits in gym bags, pockets, and sports equipment",
                icon: <ShoppingBag className="w-6 h-6" />
              },
              {
                scene: "Scene 8",
                title: "Multi-Sport Usage",
                description: "Perfect for runners, gym-goers, basketball players, and hikers",
                icon: <Users className="w-6 h-6" />
              },
              {
                scene: "Scene 9-11",
                title: "Call to Action",
                description: "Your sports hygiene partner - freshness that moves with you",
                icon: <MessageCircle className="w-6 h-6" />
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8f1eae]/10 to-[#7aea18]/10 rounded-xl flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <Badge variant="secondary">{item.scene}</Badge>
                  </div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Product Features */}
      <section className="w-full py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground mb-4">{t('WHY')} Wetty Sports Wipes?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('WHY_REASON')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('INSTANT_CLEAN'),
                description: t('INSTANT_CLEAN_REASON'),
                icon: "⚡"
              },
              {
                title: t('PROTECTION_99'),
                description: t('PROTECTION_99_REASON'),
                icon: "🛡️"
              },
              {
                title: t('STAY_DRY'),
                description: t('STAY_DRY_REASON'),
                icon: "💧"
              },
              {
                title: t('PORTABLE_DESIGN'),
                description: t('PORTABLE_DESIGN_REASON'),
                icon: "🎒"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 bg-gradient-to-br from-[#8f1eae]/10 to-[#7aea18]/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-primary/20">
            <CardContent className="p-0 space-y-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {t('ATTENTION')}
              </Badge>
              
              <h3 className="text-3xl font-medium text-foreground">
                {t('ATTENTION_DESCRIPTION')}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t('ATTENTION_SUBDESCRIPTION')}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Button 
                  size="lg" 
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleWhatsAppOrder('animation', 'I would like to order Wetty Sport Wet Tissue from the animation page', 'Wetty Sport', 'RM3.90')}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('BUTTONS.ORDER_NOW')}
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="gap-2"
                  style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
                  onClick={() => onNavigate('products')}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t('BUTTONS.VIEW_ALL_PRODUCTS')}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t">
                {/* <div className="space-y-1">
                  <p className="text-2xl font-medium text-primary">4</p>
                  <p className="text-xs text-muted-foreground">Fragrances</p>
                </div> */}
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-primary">99.9%</p>
                  <p className="text-xs text-muted-foreground">{t('GERM_PROTECTION')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-primary">RM3.90</p>
                  <p className="text-xs text-muted-foreground">{t('STARTING_PRICE')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-medium text-primary">43%</p>
                  <p className="text-xs text-muted-foreground">{t('SAVINGS')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
