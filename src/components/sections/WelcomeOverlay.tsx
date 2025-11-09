import {
  useState,
  useEffect
} from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react'
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { welcomeOverlaySlides } from '../../assets/constants';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface WelcomeOverlayProps {
  isVisible: boolean
  onClose: () => void
}
export function WelcomeOverlay({ isVisible, onClose }: WelcomeOverlayProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % welcomeOverlaySlides.length)
      }, 3000)

      return () => clearInterval(interval)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [isVisible, welcomeOverlaySlides.length])

  // Auto-close after all slides have been shown
  useEffect(() => {
    if (!isVisible) return
    
    const timer = setTimeout(() => {
      onClose()
    }, 15000) // Close after 15 seconds

    return () => clearTimeout(timer)
  }, [isVisible, onClose])

  if (!isVisible) return null

  const currentSlideData = welcomeOverlaySlides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full w-10 h-10 p-0 shadow-lg"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Main Content */}
          <div className="relative h-[80vh] md:h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col md:flex-row"
              >
                {/* Image Section */}
                <div className="relative flex-1 h-1/2 md:h-full">
                  <ImageWithFallback
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} opacity-30`} />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSlideData.color} text-white shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary"
                    >
                      {currentSlideData.title}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                      {currentSlideData.subtitle}
                    </motion.p>

                    {/* Brand Message */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="pt-4"
                    >
                      <h3 className="text-lg font-medium text-primary mb-2">Veyra Global Ventures</h3>
                      <p className="text-sm text-muted-foreground">
                        Smart wetsuits that adapt to your water adventures
                      </p>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <Button
                        onClick={onClose}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3"
                      >
                        Explore Our Products
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {welcomeOverlaySlides.map((_, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: index === currentSlide ? 1.2 : 0.8,
                  backgroundColor: index === currentSlide ? '#8f1eae' : '#e5e7eb'
                }}
                transition={{ duration: 0.3 }}
                className="w-3 h-3 rounded-full border border-white/50"
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / welcomeOverlaySlides.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}