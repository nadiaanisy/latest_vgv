import {
  useState,
  useEffect
} from 'react';
import {
  motion,
  AnimatePresence
} from 'motion/react';
import vlogo from '../../assets/images/others/vlogo.png';
import bgSplashv2 from '../../assets/images/others/bgsplash_v2.jpeg';
import { ImageWithFallback } from '../../functions/imageWithFallback';

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({
  onComplete
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 800)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ 
            opacity: { duration: 0.5 },
            x: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary text-white"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(143, 30, 174, 0.85) 0%, rgba(122, 234, 24, 0.85) 100%),
              url(${bgSplashv2})
            `,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-center space-y-8">
            {/* Large V Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              className="mx-auto"
            >
              <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white drop-shadow-2xl">
                <ImageWithFallback
                  src={vlogo}
                  alt="Veyra Global Ventures Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.6,
                ease: "easeOut"
              }}
              className="space-y-4"
            >
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide text-black"
              >
                Gentle Care, Global Trust
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="h-1 w-24 bg-black mx-auto origin-center"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-sm md:text-base text-black max-w-md mx-auto"
              >
                About your gentle care and comfort
              </motion.p>
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="text-xs md:text-sm text-black tracking-widest uppercase"
            >
              Veyra Global Ventures
            </motion.div>
          </div>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => {
              setIsVisible(false)
              setTimeout(onComplete, 300)
            }}
            className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm underline transition-colors"
          >
            Skip
          </motion.button>

          {/* Progress Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}